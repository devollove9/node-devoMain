import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'
import { idGenerator } from '@/libs'
import validation from '@/validations/auth/renew'

export default [
  queryValidator(validation),
  async (ctx, next) => {
    let maxAge = ctx.params.maxAge;
    if (maxAge < 2592000) maxAge = 2592000;
    ctx.token.maxAge = maxAge;
    let result = await redis.expire(ctx.token.token, maxAge);
    if (result.toString() !== '1') throw errors.LOCALSERVICE.REDIS.SETEXPIRETOKEN;
    result = await redis.expire('USERID::'+ctx.token.token,ctx.params.maxAge + 20);
    if (result.toString() !== '1') throw errors.LOCALSERVICE.REDIS.SETEXPIREUSER;
    const al = new models.AccessLog(
      {
        userId: ctx.token.userId,
        accessId: idGenerator(),
        placeDate: new Date().getTime(),
        requestMethod: ctx.request.method,
        actionType: ctx.request.url,
        ipReal: ctx.ipReal,
        ipForward: ctx.ipForward,
        platform: ctx.request.header['user-agent'],
        host: ctx.request.header.host,
        origin: ctx.request.header.origin,
        referer: ctx.request.header.referer,
        status: 200
      }
    )
    await al.save();
    send(ctx, ctx.token)
    await next()
  }
]
