/**
 * Created by devollove9 on 2017/10/29.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        username: Joi.usernameRegister(),
        password: Joi.string().hex().length(32).required(),
        firstName: Joi.string().allow(null).allow(''),
        lastName: Joi.string().allow(null).allow(''),
        name: Joi.string().allow(null).allow(''),
        paymentPlanId: Joi.string().allow(null).allow(''),
        expiration: Joi.number().allow(null).allow('')
    }
)

export default schema
