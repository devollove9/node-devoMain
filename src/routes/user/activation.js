/**
 * Created by devollove9 on 2017/10/29.
 * **APIDOC**
 * @Description Register with email/resend activation code
 * @Throw USER.USER_USERNAME_EXIST
 */

import { queryValidator } from '@/middlewares'
import chance from 'chance'
import microtime from 'microtime'

import validation from '@/validations/user/activation'

export default [
    queryValidator(validation),
    async (ctx, next) => {
        let user
        let request = {}

        request.code = chance.shuffle((microtime.now().toString(16) + chance.hash({length: 26})).split('')).slice(0, 8).join('')
        request.type = 'email_activation'
        request.username = ctx.params.username

        // Try Find User
        user = await models.User
            .findOne()
            .where('username').equals(ctx.params.username.toLowerCase())

        // Send activation email if user exist and not activated or disabled
        if (user) {
            if (user.disabled === false && user.activated === false) {
                let activationLink = ENV.COMPANY.DOMAIN + '/activate/' + ctx.params.username + '/' + request.code
                let body = templates.activate({
                    email: ctx.params.username,
                    code: request.code,
                    activationLink: activationLink
                })
                await services.emailService.send(ENV.COMPANY.NOREPLY_EMAIL, ctx.params.username, ENV.COMPANY.APPLICATION_NAME + ' Account Activation', body, true, {
                    attachments: [
                        {
                            filename: 'email.logo.png',
                            content: resources.emailLogo,
                            cid: 'images@logo'
                        }
                    ]
                })
            }
        }

        send(this, {})
        await next()
    }
]
