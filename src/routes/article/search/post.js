/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import _ from 'underscore'

import validation from '@/validations/article/search/post'
// import permission from '@/permissions/article/post'
export default [
  queryValidator(validation),
  /*
    permissionFilter(
        {
            role: 'user',
            action: 'user.get',
            criteria: {
                '_userId': ':userId'
            }
        },
        {
            role: 'operator',
            action: 'user.get',
            criteria: {}
        },
        {
            role: 'store',
            action: 'user.get',
            criteria: {}
        },
        {
            role:'admin',
            action:'user.get',
            criteria:{}
        }
    ),
*/
  async (ctx, next) => {
    let query = models.Article;
    let query2 = models.Article;
    let page = ctx.params.page || 1;
    let limit = 10;
    if (ctx.params.limit !== undefined) limit = ctx.params.limit
    const skip = (page - 1)* limit
    let copyOfQuery = _.omit(ctx.params, 'filterBy', 'filterOperator', 'filterValue', 'page', 'limit');
    let idList = [];
    if (ctx.params.name)  {
      if (ctx.params.name.length > 0) {
        let category = await models.ArticleCategory
          .find({name: {$in: ctx.params.name }}).lean().exec();
        if (category.length === 0) throw errors.ARTICLE.CATEGORY_NOT_EXIST;

        const acIds = category.map(c => {return c.articleCategoryId});

        let ids = await models.ArticleToCategory
          .find({articleCategoryId: {$in: acIds}}).lean().exec();

        if (ids.length === 0) throw errors.ARTICLE.CATEGORY_HAS_NO_ARTICLE;
        idList = ids.map(c => {return c.articleId});
      }
    }
    let dataParams = {};
    if (ctx.params.text) {
      let and = [
        {
          $or: [
            {title: {$regex: ctx.params.text, $options: 'i'}},
            {authorName: {$regex: ctx.params.text, $options: 'i'}}
          ]
        }
      ];

      if (idList.length > 0) and.push({ articleId: { $in: idList}})

      let contentIds = [];
      if (ctx.params.searchArticle) {
        let tempP = {$and: []}
        if (idList.length > 0) tempP.$and.push({ articleId: { $in: idList}})
        tempP.$and.push({content: {$regex: ctx.params.text, $options: 'i'}})
        const contents = await models.Content
          .find(tempP).lean().exec();

        contentIds = contents.map(c => {return c.articleId});
      }

      if (contentIds.length > 0) {
        dataParams.$or = [
          {$and: and},
          {articleId: {$in: contentIds}}
        ];
      } else {
        dataParams.$and = and;
      }
      query = query.find(dataParams).sort({updateDate:-1})
      query2 = query2.find(dataParams).sort({updateDate:-1})
    } else if (idList.length > 0) {
        query = query.find({articleId: {$in: idList}}).sort({updateDate:-1})
        query2 = query2.find({articleId: {$in: idList}}).sort({updateDate:-1})
    } else {
      query = query.find(copyOfQuery).sort({updateDate:-1})
      query2 = query2.find(copyOfQuery).sort({updateDate:-1})

    }

    let filterBy = [];
    let filterOperator = [];
    let filterValue = [];

    if (ctx.params.filterBy && ctx.params.filterOperator && ctx.params.filterValue) {
      filterBy = ctx.params.filterBy.split(',');
      filterOperator = ctx.params.filterOperator.split(',');
      filterValue = ctx.params.filterValue.split(',');
    }

    if (filterBy.length !== filterOperator.length || filterBy.length !== filterValue.length) {
      throw errors.ARTICLE.QUERY_ERROR;
    }
    for (let i = 0; i < filterBy.length; i++) {
      query = query.where(filterBy[i])[filterOperator[i]](isNaN(filterValue[i])?filterValue[i]:Number(filterValue[i]));
    }

    query = query.skip(skip).limit(limit);
    let result = await query.lean().exec();
    const total = await query2.count().lean().exec();

    for (let r of result) {
      let categories = await models.ArticleToCategory
        .find()
        .where('articleId').equals(r.articleId).lean().exec();

      let categoryIds = [];
      categories.forEach( c => categoryIds.push(c.articleCategoryId));
      r.total = total;
      r.categories = await models.ArticleCategory
        .find({'articleCategoryId': { $in: categoryIds}}).select('-__v').select('-_id').lean().exec();
    }

    if (ctx.params.articleId) {
      let content = await models.Content
        .findOne()
        .where('contentId').equals(result[0].contentId).lean().exec();

      result[0].content = contnt.content || '';
    }

    send(ctx, result)
    await next()
  }
]
