/**
 * Created by devollove9 on 2017/10/26.
 *  User Sign In Authentication
 *  @params username
 *  @params password
 *  @params maxAge
 */
import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'
import { crypt, saveRedisSession } from '@/libs'
import microtime from 'microtime'
import Chance from 'chance'
import validation from '@/validations/auth/user/get'
export default [
    queryValidator(validation),
    async (ctx, next) => {
        // Find User
        let user

        user = await models.User
            .findOne()
            .where('username').equals(ctx.params.username)

        if (!user) throw errors.AUTHENTICATION.USER_NOT_EXIST

        // Check User Disabled
        if (user.disabled) throw errors.AUTHENTICATION.USER_DISABLED

        // Check Password
        if (user.password !== crypt.encrypt(ctx.params.password)) throw errors.AUTHENTICATION.USERNAME_PASSWORD_INCORRECT

        // Gather Permissions
        let userPermission = await models.Permission
            .findOne()
            .where('userId').equals(user.userId)

        let modelPermission = []
        let userSession = {}
        let chance = new Chance()

        userSession.modelPermission = modelPermission
        userSession.maxAge = ctx.params.maxAge > 3600 ? 3600 : ctx.params.maxAge
        userSession.token = chance.hash() + microtime.now().toString(16)
        userSession.userId = user.userId
        userSession.credential = 'username'
        userSession.username = user.username
        userSession.permission = []
        if (userPermission && userPermission.permission) {
            for (let p of userPermission.permission) {
                let P = {}
                P.role = p.role
                P.criteria = {}
                p.parameter.forEach(x => {
                    P.criteria[x.key] = x.value
                })
                P.restrict = p.restrict
                P.action = p.action
                userSession.permission.push(P)
            }
        }
        userSession.role = []
        for (let permission of userSession.permission) {
            userSession.role.push(permission.role)
        }

        let result = await saveRedisSession(userSession, redis)

        if (result.toString() !== 'OK') throw errors.DEPENDENCY.REDIS.SETEX

        send(ctx, userSession)
        await next()
    }
]
