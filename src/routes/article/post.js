/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { idGenerator } from '@/libs'
import validation from '@/validations/article/post'
// import permission from '@/permissions/article/get'
export default [
  queryValidator(validation),
    permissionFilter(
      [
        {
            role: 'user',
            action: 'article.post',
            criteria: {
                '_userId': ':userId'
            }
        }
      ]
    ),
  async (ctx, next) => {
    let model = new models.Article();
    let user = await models.User
      .findOne()
      .where('userId').equals(ctx.params.userId);

    if (!user) throw errors.AUTHENTICATION.USER_NOT_EXIST;
    model.articleId = idGenerator();
    model.userId = ctx.params.userId;
    const placeDate = new Date().getTime();

    let content = new models.Content();
    content.contentId = idGenerator();
    content.articleId = model.articleId;
    content.userId = user.userId;
    content.content = ctx.params.content;
    content.placeDate = placeDate;
    content.updateDate = placeDate;
    await content.save();

    if (ctx.params.categories) {
      ctx.params.categories.forEach( async c => {
        let ac = new models.ArticleToCategory();
        ac.articleCategoryId = c;
        ac.articleId = model.articleId;
        await ac.save();
      })
    }

    model.title = ctx.params.title;
    model.authorName = ctx.params.authorName;
    model.rating = 0;
    model.viewCount = 0;
    model.uniqueViewCount = 0;
    model.contentId = content.contentId;
    model.publishDate = placeDate;

    await model.save();
    send(ctx, model);
    await next();
  }
]
