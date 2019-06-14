import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    name: Joi.string().required(),
    nameCN: Joi.string()
  }
)

export default schema
