/**
 * Created by devo on 11/1/2017.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        userId: Joi.id(),
        userProfileId: Joi.id()
    }
).or('userId', 'userProfileId')

export default schema
