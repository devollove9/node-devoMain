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
  permissionFilter(
    [
      {
          role: 'user',
          action: 'article.articleToCategory.del',
          criteria: {
          }
      },
      {
          role: 'operator',
          action: 'article.articleToCategory.del',
          criteria: {
          }
      },
      {
          role: 'manager',
          action: 'article.articleToCategory.del',
          criteria: {}
      },
      {
          role:'admin',
          action:'article.articleToCategory.del',
          criteria:{}
      }
    ]
  ),
  async (ctx, next) => {
    let article = await models.Article
      .findOne()
      .where('articleId').equals(ctx.params.articleId)

    if (! article) throw errors.ARTICLE.ARTICLE_NOT_EXIST
    if (ctx.roles.includes('user') && ctx.roles.length === 1) {
      if (article.userId !== ctx.token.userId) throw errors.ARTICLE.TRYING_TO_DELETE_OTHER_USER
    }
    let model = await models.ArticleToCategory
      .findOneAndRemove()
      .where('articleCategoryId').equals(ctx.params.articleCategoryId)
      .where('articleId').equals(ctx.params.articleId)

    if (! model) throw errors.ARTICLE.CATEGORY_NOT_EXIST_IN_ARTICLE;

    send(ctx, {result: 'Success'});
    await next();
  }
]
