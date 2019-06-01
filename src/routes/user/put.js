/**
 * Created by devo on 10/31/2017.
 * **APIDOC**
 * @Description update user
 * @Throw USERPROFILE.INVALID
 */

import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { crypt , loader as load } from '@/libs'
import validation from '@/validations/user/put'

export default [
    // bodyParser(),
    queryValidator(load('validations/user/put')),
    permissionFilter(
        {
            role:'user',
            action:'user.put',
            criteria:{
                ':disabled':false,
                '_userId':':userId'
            }
        },
        {
            role: 'superAdmin',
            action: 'user.put',
            criteria: {}
        },
        {
            role: 'rootAdmin',
            action: 'user.put',
            criteria: {}
        },
        {
            role: 'owner',
            action: 'user.put',
            criteria: {}
        }
    ),
    async (ctx, next) => {

        let user
        user = await models.EmailCredential
            .findOne()
            .where('userId').equals(ctx.params.userId)

        if (!user) throw errors.USER.USER_NOT_EXIST

        if (ctx.params.disabled !== undefined) {
            if (ctx.params.disabled === true) {
                user.disabled = true
                user.reasonDisabled = ctx.params.reasonDisabled
                user.codeDisabled = ctx.params.codeDisabled
            } else {
                user.disabled = false
                user.reasonDisabled = ''
                user.codeDisabled = 0
            }
        } else {
            if (user.password !== crypt.encrypt(ctx.params.password)) throw errors.AUTHENTICATION.USERNAME_PASSWORD_INCORRECT
            user.password = crypt.encrypt(ctx.params.newPassword)
        }
        await user.save()
        send(ctx,{user:user.username})
        await next()
    }
];

