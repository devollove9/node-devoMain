import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleCategoryId: Joi.id(),
    name: Joi.string(),
    nameCN: Joi.string(),
    filterBy:Joi.stringArray('articleCategoryId','name','nameCN'),
    filterOperator:Joi.stringArray('lte','equals','gte','ne','lt','gt'),
    filterValue:Joi.stringArray(),
  }
).with('filterBy','filterOperator','filterValue')

export default schema
