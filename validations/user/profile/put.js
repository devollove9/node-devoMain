/**
 * Created by devo on 11/1/2017.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        userProfileId: Joi.id().required(),
        name: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        isPublic: Joi.boolean(),
        affliation: Joi.string(),
        jobPosition: Joi.string(),
        jobTitle: Joi.string(),
        fieldOfStudy: Joi.array().items(Joi.string()),
        education: Joi.array().items(
            Joi.object().keys({
                facility:Joi.string(),
                duration:Joi.string(),
                address:Joi.string(),
                degree:Joi.string(),
                major:Joi.string(),
                description:Joi.string(),
                isLatest:Joi.boolean()
            })
        ),
        experience: Joi.array().items(
            Joi.object().keys({
                facility:Joi.string(),
                duration:Joi.string(),
                address:Joi.string(),
                title:Joi.string(),
                description:Joi.string(),
                isLatest:Joi.boolean()
            })
        ),
    }
)

export default schema
