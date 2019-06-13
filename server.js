/**
 * Created by devollove9 on 2017/10/26.
 */
import Koa from 'koa'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import { errorHandler } from '@/middlewares'
import { errors } from '@/constants'
import router from '@/src/routes'
import cors from '@koa/cors'

let app = new Koa()

const server = (global) => {
  // Use bodyParser middleware
  app.use(bodyParser())

  // Allow corss origin
  app.use(cors())

  // Use error handler
  app.use(errorHandler())

  // Use gizp encoding
  app.use(compress())

  // Use routes
  app.use(router())

  app.use(async (ctx, next) => {
    if (ctx.response.status !== 200) {
      ctx.response.status = 200
      throw errors.HTTP['422']
    }
    await next()
  })

  return app
}

export default server