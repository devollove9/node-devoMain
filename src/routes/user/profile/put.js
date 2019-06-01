/**
 * Created by devo on 10/31/2017.
 */
import { errors } from '@/constants'
import { queryValidator, permissionFilter } from '@/middlewares'
import { crypt } from '@/libs'

import validation from '@/validations/user/profile/put'
// import permission from '@/permissions/auth/user'
export default [
    queryValidator(validation),
    permissionFilter(
        {
            role: 'user',
            action: 'user.profile.put',
            criteria: {
                '_userId': ':userId'
            }
        },
        {
            role: 'superAdmin',
            action: 'user.profile.put',
            criteria: {}
        },
        {
            role: 'rootAdmin',
            action: 'user.profile.put',
            criteria: {}
        },
        {
            role: 'owner',
            action: 'user.profile.put',
            criteria: {}
        }
    ),
    async (ctx, next) => {
        let userProfile
        userProfile = await models.UserProfile
            .findOne()
            .where('userProfileId').equals(ctx.params.userProfileId)
        
        if (!userProfile) throw errors.USERPROFILE.USER_PROFILE_NOT_EXIST

        /*
        if (ctx.params.personalIcon) {
            if (ctx.params.personalIcon.web) {
                ctx.params.personalIcon.web = await uploadImage(ctx.params.personalIcon.web)
                ctx.params.personalIcon.web= '/' + ctx.params.logo.web
            }
            if (ctx.params.personalIcon.mini) {
                ctx.params.personalIcon.mini= await uploadImage(ctx.params.personalIcon.mini)
                ctx.params.personalIcon.mini = '/' + ctx.params.logo.mini
            }
            if (ctx.params.personalIcon.phone) {
                ctx.params.personalIcon.phone = await uploadImage(ctx.params.personalIcon.phone)
                ctx.params.personalIcon.phone = '/' + ctx.params.personalIcon.phone
            }
        }
        */
        await userProfile.update(flattenObject(ctx.params))
        send(ctx, userProfile)
        await next()
    }
]
