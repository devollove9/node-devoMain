/**
 * Created by devollove9 on 2017/10/26.
 */
import { joiValidate as joi } from '@/libs'
import { errors } from '@/constants'

export default (validation) => {
    return async (ctx, next) => {
        let requestQuery = ctx.request.query
        if (ctx.method.toLowerCase() === 'get') {
            requestQuery = ctx.request.query
        } else {
            requestQuery = ctx.request.body
        }
        if (requestQuery === undefined) {
            throw errors.HTTP[ '422' ]
        }

        let result = joi.validate(requestQuery, validation)
        if (result.error) {
            const error = {}
            error.errorCode = 422
            error.errorMessage = errors.HTTP[ '422' ].errorMessage
            if (ENV.DEBUG || ctx.headers[ 'x-response-errordetail' ]) {
                error.errorDetail = result.error
            }
            throw error
        } else {
            ctx.params = result.value
        }
        await next()
    }
}
