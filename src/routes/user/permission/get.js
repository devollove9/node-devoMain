/**
 * Created by devollove9 on 2017/10/27.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'

import validation from '@/validations/user/permission/get'

export default [
    queryValidator(validation),
    permissionFilter(
        {
            role: 'superAdmin',
            action: 'user.permission.get',
            criteria: {}
        }, 
        {
            role: 'rootAdmin',
            action: 'user.permission.get',
            criteria: {}
        }, 
        {
            role: 'owner',
            action: 'user.permission.get',
            criteria: {}
        }
    ),
    async (ctx, next) => {
        let permission = []
        if (ctx.params) {
            permission = await models.Permission
                .find(this.params)
        } else {
            permission = await models.Permission
                .find({})
        }
        if (!permission) {
            throw errors.USER.USER_PERMISSION_NOT_EXIST
        }
        send(ctx, permission)
        await next()
    }

]
