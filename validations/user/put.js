/**
 * Created by devo on 11/1/2017.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        userId: Joi.id().required(),
        username: Joi.username(),
        password: Joi.string().hex().length(32),
        newPassword: Joi.string().hex().length(32),
        activated: Joi.boolean(),
        disabled: Joi.boolean(),
        codeDisabled: Joi.number().integer()
    }
).with('password', 'newPassword').with('disabled','reasonDisabled','codeDisabled','username')

export default schema
