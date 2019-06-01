/**
 * Created by devo on 10/31/2017.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        code: Joi.string().hex().length(6).required(),
        username: Joi.username(),
        password: Joi.string().hex().length(32).required()
    }
)

export default schema
