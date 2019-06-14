/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { idGenerator } from '@/libs'
import validation from '@/validations/article/category/post'
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
    let model = new models.ArticleCategory();
    let name = await models.ArticleCategory
      .findOne()
      .where('name').equals(ctx.params.name);

    if (name) throw errors.ARTICLE.ARTICLECATEGORY_ALREADY_EXIST;

    if (ctx.params.nameCN) {
      let nameCN = await models.ArticleCategory
        .findOne()
        .where('nameCN').equals(ctx.params.nameCN);

      if (nameCN) throw errors.ARTICLE.ARTICLECATEGORY_ALREADY_EXIST;
    }


    model.articleCategoryId = idGenerator();
    model.name = ctx.params.name;
    model.nameCN = ctx.params.nameCN || '';

    await model.save();
    send(ctx, model);
    await next();
  }
]
