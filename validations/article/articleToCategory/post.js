import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id().required(),
    articleCategoryId: Joi.id().required()
  }
)

export default schema
