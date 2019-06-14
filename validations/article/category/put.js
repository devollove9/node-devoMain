import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleCategoryId: Joi.id().required(),
    name: Joi.string(),
    nameCN: Joi.string()
  }
)

export default schema
