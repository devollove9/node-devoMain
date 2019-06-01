/**
 * Created by devollove9 on 2017/10/27.
 */
import { joiValidate as Joi } from '@/libs'

const schema = Joi.object().keys(
    {
        userId: Joi.id(),
        permissionId: Joi.id()
    }
).or('userId', 'permissionId')

export default schema
