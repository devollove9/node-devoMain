import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
  {
    articleId: Joi.id(),
    updateDate: Joi.number(),
    viewCount: Joi.number(),
    uniqueViewCount: Joi.number(),
    authorName: Joi.string(),
    content: Joi.string(),
  }
)

export default schema
