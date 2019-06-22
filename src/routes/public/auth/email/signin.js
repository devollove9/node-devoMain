import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'
import crypt from '@/libs/encryption/crypt'
import validation from '@/validations/public/auth/email/signin'
import { saveRedisSession, idGenerator } from '@/libs'
import Chance from 'chance'
const chance = new Chance()

export default [
  queryValidator(validation),
  async (ctx, next) => {
    const model = models.User;
    let user = await model
      .findOne()
      .where('username').equals(ctx.params.username).lean().exec();

    if (!user) throw errors.AUTHENTICATION.USERNAME_PASSWORD_INCORRECT

    // Check Password
    if (user.password !== crypt.encrypt(ctx.params.password)) throw errors.AUTHENTICATION.USERNAME_PASSWORD_INCORRECT

    // Check User Disabled
    if (user.disabled) throw errors.AUTHENTICATION.USER_DISABLED

    // Gather Permissions
    let userPermission = await models.Permission
      .findOne()
      .where('userId').equals(user.userId)

    let modelPermission = []
    let userSession = {}

    userSession.modelPermission = modelPermission
    userSession.maxAge = ctx.params.maxAge < 144000 ? 144000 : ctx.params.maxAge
    userSession.token = chance.hash({length: 112}) + ((new Date().getTime())*1000).toString(16)
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
    if (result.toString() !== 'OK') throw errors.LOCALSERVICE.REDIS.SETEX

    try {
      let userInfo = await models.User
        .findOne()
        .where('userId').equals(user.userId)
        .lean().exec();

      if (userInfo) userInfo.lastLoginDate = new Date().getTime();
      await userInfo.save();
    } catch (e) {}

    const al = new models.AccessLog(
      {
        userId: user.userId,
        accessId: idGenerator(),
        placeDate: new Date().getTime(),
        requestMethod: ctx.request.method,
        actionType: ctx.request.url,
        ipReal: ctx.request.header['x-real-ip'],
        ipForward: ctx.request.header['x-forwarded-for'],
        platform: ctx.request.header['user-agent'],
        host: ctx.request.header.host,
        origin: ctx.request.header.origin,
        referer: ctx.request.header.referer,
        status: 200
      }
    )
    await al.save();

    send(ctx, userSession)
    await next()
  }
]
