import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    userId: Joi.id().required(),
    content: Joi.string().required(),
    title: Joi.string().required(),
    authorName: Joi.string().required(),
    categories:Joi.array().items(Joi.string())
  }
)

export default schema
