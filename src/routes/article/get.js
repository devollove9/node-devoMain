/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import _ from 'underscore'

import validation from '@/validations/article/get'
// import permission from '@/permissions/article/get'
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
        let page = ctx.params.page || 0;
        let limit = ctx.params.limit || 10;
        let skip = page * limit;
        let query = models.Article;
        let copyOfQuery = _.omit(ctx.params, 'filterBy', 'filterOperator', 'filterValue');
        query = query.find(copyOfQuery).sort({updateDate:-1}).skip(skip)
        .limit(limit);

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

        let result = await query.lean().exec();

        for (let r of result) {
          let categories = await models.ArticleToCategory
            .find()
            .where('articleId').equals(r.articleId).lean().exec();

          let categoryIds = [];
          categories.forEach( c => categoryIds.push(c.articleCategoryId));

          r.categories = await models.ArticleCategory
            .find({'articleCategoryId': { $in: categoryIds}}).select('-__v').select('-_id').lean().exec();
        }

        // console.log(result);
        if (ctx.params.articleId) {
          let content = await models.Content
            .findOne()
            .where('contentId').equals(result[0].contentId).lean().exec();

          result[0].content = content.content || '';
        }

        send(ctx, result)
        await next()
    }
]
