import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id(),
    contentId: Joi.id(),
    userId: Joi.id(),
    filterBy:Joi.stringArray('articleId','userId','publishDate','contentId'),
    filterOperator:Joi.stringArray('lte','equals','gte','ne','lt','gt'),
    filterValue:Joi.stringArray(),
  }
).with('filterBy','filterOperator','filterValue')

export default schema
