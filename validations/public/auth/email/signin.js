import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    username: Joi.username().required(),
    password: Joi.password().required(),
    maxAge: Joi.number().integer().min(0).required(),
  }
)

export default schema