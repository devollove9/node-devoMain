/**
 * Created by devollove9 on 2017/10/26.
 */
import { crypt } from '@/libs'
export default [
  async (ctx, next) => {
    send(ctx, {timestamp: new Date().getTime()})
    await next()
  }
]
