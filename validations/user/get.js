/**
 * Created by devollove9 on 2017/10/27.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        username: Joi.string().email().allow(''),
        userId: Joi.id()
    }
).or('userId', 'username')

export default schema
