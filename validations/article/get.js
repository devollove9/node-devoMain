import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id(),
    userId: Joi.id(),
    publishDate: Joi.number(),
    viewCount: Joi.number(),
    uniqueViewCount: Joi.number(),
    authorName: Joi.string(),
    filterBy:Joi.stringArray('articleId','userId','publishDate','viewCount','uniqueViewCount','authorName'),
    filterOperator:Joi.stringArray('lte','equals','gte','ne','lt','gt'),
    filterValue:Joi.stringArray(),
  }
).with('filterBy','filterOperator','filterValue')

export default schema
