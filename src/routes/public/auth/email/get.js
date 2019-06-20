import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'

import validation from '@/validations/public/auth/email/get'

export default [
  queryValidator(validation),
  async (ctx, next) => {
    const model = models.User;
    let res = await model
      .findOne()
      .where('username').equals(ctx.params.username).lean().exec();
    let result = {exist: true}
    if (!res) result.exist = false
    send(ctx, result)
    await next()
  }
]
