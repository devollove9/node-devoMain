import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'
import { idGenerator, crypt } from '@/libs'
import validation from '@/validations/public/auth/email/post'

export default [
  queryValidator(validation),
  async (ctx, next) => {
    let model = await models.User
      .findOne()
      .where('username').equals(ctx.params.username).lean().exec();

    if (model) throw errors.USER.USER_USERNAME_EXIST;
    const userId = idGenerator();
    let date = new Date().getTime();
    let user = new models.User({
      username: ctx.params.username,
      userId: userId,
      registerDate: date,
      lastLoginDate: 0,
      password: crypt.encrypt(ctx.params.password),
      disabled: false,
      activated: false,
      account: {
        credit: 0,
        balance: 0
      },
      notification: {
        arn: '',
        platform: ''
      }
    });
    await user.save();

    send(ctx, { result: 'success' })
    await next()
  }
]
