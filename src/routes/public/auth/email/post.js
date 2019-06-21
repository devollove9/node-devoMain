import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'
import { idGenerator } from '@/libs'
import crypt from '@/libs/encryption/crypt'
import validation from '@/validations/public/auth/email/post'
import Chance from 'chance'
const chance = new Chance()

export default [
  queryValidator(validation),
  async (ctx, next) => {
    let model = await models.User
      .findOne()
      .where('username').equals(ctx.params.username).lean().exec();

    if (model) throw errors.USER.USER_USERNAME_EXIST;
    const newUserId = idGenerator();
    let date = new Date().getTime();
    let user = new models.User({
      username: ctx.params.username,
      userId: newUserId,
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

    let newUserProfile = new models.UserProfile({
      userId: newUserId,
      userProfileId: idGenerator(),
      birthDate: ctx.params.birthDate || '',
      gender: ctx.params.gender || '',
      name: ctx.params.name || '',
      firstName: ctx.params.firstName || '',
      lastName: ctx.params.lastName || '',
      isPublic: ctx.params.isPublic || false,
      affiliation: ctx.params.affiliation || '',
      jobPosition: ctx.params.jobPosition || '',
      jobTitle: ctx.params.jobTitle || '',
      fieldOfStudy: ctx.params.fieldOfStudy || ['']
    })
    await newUserProfile.save()

    let newPermission = new models.Permission(
      {
        userId: newUserId,
        permissionId: idGenerator(),
        permission: [
          {
            role: 'user',
            parameter: [],
            restrict: [],
            action: '*',
            criteria: {
              userId: newUserId
            }
          }
        ]
      }
    )
    await newPermission.save()

    let request = {}

    request.code = chance.shuffle(((date*1000).toString(16) + chance.hash({length: 26})).split('')).slice(0, 6).join('')
    request.type = 'email_activation'
    request.email = ctx.params.username

    let activationLink = ENV.COMPANY.DOMAIN + '/activate?email=' + ctx.params.username + '&code=?' + request.code
    let body = templates.activate({
      email: ctx.params.username,
      code: request.code,
      activationLink: activationLink
    })
    const fromEmail = ENV.COMPANY.NOREPLY_EMAIL || '';
    const appName = ENV.COMPANY.APPLICATION_NAME || '';
    /*
    try {
      await services.emailService.send(fromEmail, ctx.params.username, appName + ' Account Activation', body, true, {
        attachments: [
          {
            filename: 'email.logo.png',
            content: resources.emailLogo,
            cid: 'images@logo'
          }
        ]
      })
    } catch (e) {
      console.log(e)
    }
    */

    send(ctx, { result: 'success' })
    await next()
  }
]
