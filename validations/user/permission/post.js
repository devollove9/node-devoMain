/**
 * Created by devollove9 on 2017/10/27.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys({
    userId: Joi.id().required(),
    permission: Joi.array().items(
        Joi.object().keys({
            role: Joi.string().required(),
            action: Joi.array().items(Joi.string()).required(),
            restrict: Joi.array().items(Joi.string()),
            parameter: Joi.object()
        })
    )
})

export default schema
