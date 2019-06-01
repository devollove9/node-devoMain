/**
 * Created by devo on 10/31/2017.
 */
import deepFilter from 'deep-filter'

const mongoIdHandler = () => {
    return async (ctx, next) => {
        let body
        body = JSON.parse(ctx.body)
        body.data = body.data || []
        body.data = deepFilter(body.data, (value, prop, subject) => {
            return prop !== '_id'
        })
        ctx.body = JSON.stringify(body)
        await next()
    }
}
export default mongoIdHandler
