import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id(),
    articleCategoryId: Joi.id(),
    filterBy:Joi.stringArray('articleCategoryId','articleId'),
    filterOperator:Joi.stringArray('lte','equals','gte','ne','lt','gt'),
    filterValue:Joi.stringArray(),
  }
).with('filterBy','filterOperator','filterValue')

export default schema
