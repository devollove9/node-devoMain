/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'

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
    let model = await models.Permission
      .findOne()
      .where('articleId').equals(ctx.params.articleId)
    if (! model) throw errors.ARTICLE.ARTICLE_NOT_EXIST;

    model = {...ctx.params};

    await model.save();
    send(ctx, model);
    await next();
  }
]
