/**
 * Created by devollove9 on 2017/10/29.
 * **APIDOC**
 * @Description Register with email/resend activation code
 * @Throw USER.USER_USERNAME_EXIST
 */

import { errors } from '@/constants'
import { queryValidator } from '@/middlewares'
import { crypt, idGenerator} from '@/libs'
import chance from 'chance'
import microtime from 'microtime'

import validation from '@/validations/user/signup'

export default [
    queryValidator(validation),
    async (ctx, next) => {
        let user
        let request = {}

        request.code = chance.shuffle((microtime.now().toString(16) + chance.hash({length: 26})).split('')).slice(0, 6).join('')
        request.type = 'email_activation'
        request.email = ctx.params.email

        // Try Find User
        user = await models.User
            .findOne()
            .where('username').equals(ctx.params.username.toLowerCase())

        //
        if (user) {
            throw errors.USER.USER_USERNAME_EXIST
        }
        let newUserId = idGenerator()
        let date = new Date()
        let newUser = new models.User({
            userId: newUserId,
            username: ctx.params.username.toLowerCase(),
            password: crypt.encrypt(ctx.params.password),
            registerDate: date.getTime(),
            lastLoginDate: 0,
            activated: false,
            disabled: false,
            codeDisabled: 0,
            reasonDisabled: '',
            account: {
                paymentPlanId: ctx.params.paymentPlanId || 0,
                expiration: ctx.params.expiration || -1,
                credit: 0,
                balance: 0
            },
            notification: {
                arn: '',
                platform: ''
            }
        })
        await newUser.save()

        let newProfileId = idGenerator()
        let newUserProfile = new models.UserProfile({
            userId: newUserId,
            userProfileId: newProfileId,
            name: ctx.params.name || '',
            firstName: ctx.params.firstName || '',
            lastName: ctx.params.lastName || '',
            isPublic: ctx.params.isPublic || false,
            affiliation: ctx.params.affiliation || '',
            jobPosition: ctx.params.jobPosition || '',
            jobTitle: ctx.params.jobTitle || '',
            fieldOfStudy: ctx.params.fieldOfStudy || ''
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

        let activationLink = ENV.COMPANY.DOMAIN + '/activate/' + ctx.params.email + '/' + request.code
        let body = templates.activate({
            email: ctx.params.email,
            code: request.code,
            activationLink: activationLink
        })
        await services.emailService.send(ENV.COMPANY.NOREPLY_EMAIL, ctx.params.email, ENV.COMPANY.APPLICATION_NAME + ' Account Activation', body, true, {
            attachments: [
                {
                    filename: 'email.logo.png',
                    content: resources.emailLogo,
                    cid: 'images@logo'
                }
            ]
        })
        send(ctx, {})
        await next()
    }
]
