/**
 * Created by devollove9 on 2017/10/26.
 */
export default [
  async (ctx, next) => {
    send(ctx, {timestamp: new Date().getTime(),a: ''})
    await next()
  }
]
