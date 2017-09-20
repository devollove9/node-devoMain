/**
 * Created by devollove9 on 2017/9/19.
 */
/**
 * Module dependencies.
 */

var debug = load('debug')('koa-ratelimit');
var Limiter = load('ratelimiter');
var ms = load('ms');
var thenify = load('thenify');

/**
 * Expose `ratelimit()`.
 */

module.exports = rateLimit;

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

function rateLimit(opts) {
    opts = opts || {};

    return function *(next){
        var id = opts.id ? opts.id(this) : this.ip;

        if (false === id) return yield* next;

        // initialize limiter
        var limiter = new Limiter({ id: id, __proto__: opts });
        limiter.get = thenify(limiter.get);

        // check limit
        var limit = yield limiter.get();

        // check if current call is legit
        var remaining = limit.remaining > 0 ? limit.remaining - 1 : 0;

        // header fields
        this.set('X-RateLimit-Limit', limit.total);
        this.set('X-RateLimit-Remaining', remaining);
        this.set('X-RateLimit-Reset', limit.reset);
        this.set('X-RateLimit-RemainingTime',limit.reset * 1000 - new Date().getTime());

        debug('remaining %s/%s %s', remaining, limit.total, id);
        if (limit.remaining) return yield* next;

        var delta = (limit.reset * 1000) - Date.now() | 0;
        var after = limit.reset - (Date.now() / 1000) | 0;
        if (opts.throwable) {
            throw opts.throwable(after,ms(delta, { long: true }));
        }
        this.set('Retry-After', after);
        this.status = 429;
        this.body = 'Rate limit exceeded, retry in ' + ms(delta, { long: true });
    }
}