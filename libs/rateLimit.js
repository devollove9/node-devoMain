/**
 * Created by devollove9 on 2017/10/28.
 */
/**
 * Module dependencies.
 */

import Debug from 'debug'
import Limiter from 'ratelimiter'
import ms from 'ms'
import thenify from 'thenify'

let debug = Debug('koa-ratelimit')

/**
 * Initialize ratelimit middleware with the given `opts`:
 *
 * - `duration` limit duration in milliseconds [1 hour]
 * - `max` max requests per `id` [2500]
 * - `db` database connection
 * - `id` id to compare requests [ip]
 *
 * @param {Object} opts
 * @return {Function}
 * @api public
 */

const rateLimit = (opts) => {
    opts = opts || {}

    return async (ctx, next) => {
        let id = opts.id ? opts.id(ctx) : ctx.ip

        if (id === false) return Promise.all(next())

        // initialize limiter
        let limiter = new Limiter({ id: id, __proto__: opts })
        limiter.get = thenify(limiter.get)

        // check limit
        let limit = await limiter.get()

        // check if current call is legit
        let remaining = limit.remaining > 0 ? limit.remaining - 1 : 0

        // header fields
        ctx.set('X-RateLimit-Limit', limit.total)
        ctx.set('X-RateLimit-Remaining', remaining)
        ctx.set('X-RateLimit-Reset', limit.reset)
        ctx.set('X-RateLimit-RemainingTime', limit.reset * 1000 - new Date().getTime())

        debug('remaining %s/%s %s', remaining, limit.total, id)
        if (limit.remaining) return Promise.all(next())

        let delta = (limit.reset * 1000) - Date.now() | 0
        let after = limit.reset - (Date.now() / 1000) | 0
        if (opts.throwable) {
            throw opts.throwable(after, ms(delta, { long: true }))
        }
        ctx.set('Retry-After', after)
        ctx.status = 429
        ctx.body = 'Rate limit exceeded, retry in ' + ms(delta, { long: true })
    }
}

export default rateLimit
