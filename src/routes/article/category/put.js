/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { flatten } from '@/libs'
import validation from '@/validations/article/category/put'

// import permission from '@/permissions/article/get'
export default [
  queryValidator(validation),
    permissionFilter(
      [
        {
          role: 'operator',
          action: 'article.category.post',
          criteria: {}
        },
        {
          role: 'manager',
          action: 'article.category.post',
          criteria: {}
        },
        {
          role:'admin',
          action:'article.category.post',
          criteria:{}
        }
      ]
    ),
  async (ctx, next) => {
    let model = await models.ArticleCategory
      .findOne()
      .where('articleCategoryId').equals(ctx.params.articleCategoryId)
    if (! model) throw errors.ARTICLE.ARTICLECATEGORY_NOT_EXIST;

    if (ctx.params.nameCN) {
      let nameCN = await models.ArticleCategory
        .findOne()
        .where('nameCN').equals(ctx.params.nameCN);

      if (nameCN) throw errors.ARTICLE.ARTICLECATEGORY_ALREADY_EXIST;
    }

    if (ctx.params.name) {
      let name = await models.ArticleCategory
        .findOne()
        .where('name').equals(ctx.params.name);

      if (name) throw errors.ARTICLE.ARTICLECATEGORY_ALREADY_EXIST;
    }


    await model.update(flatten(ctx.params)).exec();
    send(ctx, {});
    await next();
  }
]
