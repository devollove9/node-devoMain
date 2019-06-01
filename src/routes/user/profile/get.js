/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { crypt } from '@/libs'

import validation from '@/validations/user/profile/get'
// import permission from '@/permissions/auth/user'
export default [
    queryValidator(validation),
    permissionFilter(
        {
            role: 'user',
            action: 'user.profile.get',
            criteria: {
                '_userId': ':userId'
            }
        },
        {
            role:'admin',
            action:'user.profile.get',
            criteria:{}
        },
        {
            role: 'superAdmin',
            action: 'user.profile.get',
            criteria: {}
        },
        {
            role: 'rootAdmin',
            action: 'user.profile.get',
            criteria: {}
        },
        {
            role: 'owner',
            action: 'user.profile.get',
            criteria: {}
        }
    ),
    async (ctx, next) => {

        let userProfile
        if (ctx.params.userId != undefined) {
            userProfile = await models.UserProfile
                .findOne()
                .where('userId').equals(ctx.params.userId)
        } else {
            if (ctx.params.userProfileId !== undefined) {
                userProfile = await models.UserProfile
                    .findOne()
                    .where('userProfileId').equals(ctx.params.userProfileId)
            }
        }
        
        if (!userProfile) throw error.USERPROFILE.USER_PROFILE_NOT_EXIST
        send(ctx, userProfile)
        await next()
    }
]
