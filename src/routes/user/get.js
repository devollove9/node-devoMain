/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { crypt } from '@/libs'

import validation from '@/validations/user/get'
// import permission from '@/permissions/auth/user'
export default [
    // queryValidator(validation),
  /*
    permissionFilter(
        {
            role: 'user',
            action: 'user.get',
            criteria: {
                '_userId': ':userId'
            }
        },
        {
            role: 'operator',
            action: 'user.get',
            criteria: {}
        },
        {
            role: 'store',
            action: 'user.get',
            criteria: {}
        },
        {
            role:'admin',
            action:'user.get',
            criteria:{}
        }
    ),
*/
    async (ctx, next) => {
        // Find User
        let user
        if (ctx.params.username !== undefined) {
            user = await models.User
                .findOne()
                .where('username').equals(ctx.params.username)
        } else if (ctx.params.userId !== undefined){
            user = await models.User
                .findOne()
                .where('userId').equals(ctx.params.userId)
        } else {
            user = await models.User.find({})
        }
        send(ctx, user)
        await next()
    }
]
