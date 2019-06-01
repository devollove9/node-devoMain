/**
 * Created by devollove9 on 2017/10/27.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { idGenerator } from '@/libs'
import validation from '@/validations/user/permission/post'

export default [
    queryValidator(validation),
    permissionFilter(
        {
            role: 'superAdmin',
            action: 'user.permission.post',
            criteria: {}
        }, {
            role: 'rootAdmin',
            action: 'user.permission.post',
            criteria: {}
        }, {
            role: 'owner',
            action: 'user.permission.post',
            criteria: {}
        }
    ),
    async (ctx, next) => {
        let permission = new models.Permission()
        let user = await models.User
            .findOne()
            .where('userId').equals(ctx.params.userId)

        if (!user) throw errors.AUTHENTICATION.USER_NOT_EXIST
        permission.userId = user.userId
        permission.permissionId = idGenerator()
        permission.permission = []
        for (let p of (ctx.params.permission || [])) {
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
