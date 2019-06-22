import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    maxAge: Joi.number().integer().min(0).max(2592000).required()
  }
)

export default schema
