/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'

import validation from '@/validations/article/articleToCategory/post'
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
    let article = await models.Article
      .findOne()
      .where('articleId').equals(ctx.params.articleId)
    if (! article) throw errors.ARTICLE.ARTICLE_NOT_EXIST;

    let category = await models.ArticleCategory
      .findOne()
      .where('articleCategoryId').equals(ctx.params.articleCategoryId)
    if (! category) throw errors.ARTICLE.ARTICLECATEGORY_NOT_EXIST;

    let record = await models.ArticleToCategory
      .findOne()
      .where('articleId').equals(ctx.params.articleId)
      .where('articleCategoryId').equals(ctx.params.articleCategoryId);

    if (record) throw errors.ARTICLE.CATEGORY_ALREADY_EXIST;

    let model = new models.ArticleToCategory();
    model.articleId = ctx.params.articleId;
    model.articleCategoryId = ctx.params.articleCategoryId;

    await model.save();
    send(ctx, {result: 'Success'});
    await next();
  }
]
