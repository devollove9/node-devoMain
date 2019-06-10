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
    let model = new models.Article();
    let user = await models.User
      .findOne()
      .where('userId').equals(ctx.params.userId);

    if (!user) throw errors.AUTHENTICATION.USER_NOT_EXIST;

    let content = new models.Content();
    content.contentId = idGenerator();
    content.articleId = model.articleId;
    content.userId = model.userId;
    content.content = model.content;
    content.placeDate = placeDate;
    await content.save();

    model.userId = user.userId;
    model.articleId = idGenerator();
    model.title = ctx.params.title;
    model.authorName = ctx.params.authorName;
    model.rating = 0;
    model.viewCount = 0;
    model.uniqueViewCount = 0;
    model.contentId = content.contentId;

    await model.save();
    send(ctx, model);
    await next();
  }
]
