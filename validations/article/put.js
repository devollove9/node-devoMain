import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id().required(),
    viewCount: Joi.number(),
    uniqueViewCount: Joi.number(),
    authorName: Joi.string(),
    title: Joi.string(),
    content: Joi.string(),
    publishDate: Joi.number()
  }
)

export default schema
