/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { idGenerator, flatten } from '@/libs'
import validation from '@/validations/article/put'
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
    let model = await models.Article
      .findOne()
      .where('articleId').equals(ctx.params.articleId)
    if (! model) throw errors.ARTICLE.ARTICLE_NOT_EXIST;
    const placeDate = new Date().getTime();
    ctx.params.updateDate = placeDate;
    if (ctx.params.content) {
      let content = new models.Content();
      content.contentId = idGenerator();
      content.articleId = model.articleId;
      content.userId = model.userId;
      content.content = ctx.params.content;
      content.placeDate = placeDate;
      await content.save();
      ctx.params.contentId = content.contentId;
    }


    await model.update(flatten(ctx.params)).exec();
    send(ctx, model);
    await next();
  }
]
