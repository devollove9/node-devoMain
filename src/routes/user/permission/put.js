/**
 * Created by devollove9 on 2017/10/27.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'

import validation from '@/validations/user/permission/put'

export default [
    queryValidator(validation),
    permissionFilter(
        {
            role: 'superAdmin',
            action: 'user.permission.get',
            criteria: {}
        }, {
            role: 'rootAdmin',
            action: 'user.permission.get',
            criteria: {}
        }, {
            role: 'owner',
            action: 'user.permission.get',
            criteria: {}
        }
    ),
    async (ctx, next) => {
        let permission
        if (ctx.params.userId) {
            permission = await models.Permission
                .findOne()
                .where('userId').equals(ctx.params.userId)
        } else if (this.params.permissionId) {
            permission = await models.Permission
                .findOne()
                .where('permissionId').equals(ctx.params.permissionId)
        }

        if (!permission) {
            throw errors.USER.USER_PERMISSION_NOT_EXIST
        }
        for (let p of (this.params.permission || [])) {
            let perm = {}
            perm.role = p.role
            perm.action = p.action
            perm.restrict = p.restrict
            perm.parameter = []
            for (let k of Object.keys(p.parameter || {})) {
                perm.parameter.push(
                    {
                        key: k,
                        value: p.parameter[ k ]
                    }
                )
            }
            permission.permission.push(perm)
        }
        await permission.save()
        send(ctx, permission)
        await next()
    }
]
