import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    username: Joi.username().required(),
    password: Joi.password().required()
  }
)

export default schema