/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { flatten } from '@/libs'
import validation from '@/validations/article/articleToCategory/del'

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
    let model = await models.ArticleToCategory
      .findOneAndRemove()
      .where('articleCategoryId').equals(ctx.params.articleCategoryId)
      .where('articleId').equals(ctx.params.articleId)

    if (! model) throw errors.ARTICLE.CATEGORY_NOT_EXIST_IN_ARTICLE;

    send(ctx, {result: 'Success'});
    await next();
  }
]
