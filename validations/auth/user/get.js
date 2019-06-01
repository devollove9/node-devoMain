/**
 * Created by devo on 10/31/2017.
 */

import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        maxAge: Joi.number().integer().min(0).required(),
        username: Joi.username(),
        password: Joi.string().hex().length(32).required()
    }
)

export default schema
