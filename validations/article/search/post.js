import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id(),
    userId: Joi.id(),
    publishDate: Joi.number(),
    viewCount: Joi.number(),
    uniqueViewCount: Joi.number(),
    authorName: Joi.string(),
    articleCategoryId: Joi.array().items(Joi.id()),
    title: Joi.string(),
    text: Joi.string(),
    name: Joi.array().items(Joi.string()),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    searchArticle: Joi.boolean(),
    filterBy:Joi.stringArray('articleId','userId','publishDate','viewCount','uniqueViewCount','authorName'),
    filterOperator:Joi.stringArray('lte','equals','gte','ne','lt','gt'),
    filterValue:Joi.stringArray(),
  }
).with('filterBy','filterOperator','filterValue')

export default schema
