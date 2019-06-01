/**
 * Created by devollove9 on 2017/10/24.
 */
import _redis from 'redis'
import coRedis from 'co-redis'

const loadRedis = async (ctx) => {
    AppLogger.info('    [REDIS] Loading Redis')
    let redisClient = _redis.createClient(ENV.REDIS_PORT, ENV.REDIS_HOST)
    let redis = coRedis(redisClient)
    ctx.redis = redis
    ctx.ratelimitDB = _redis.createClient(ENV.RATELIMIT.REDIS_PORT, ENV.RATELIMIT.REDIS_HOST)
    await new Promise((resolve, reject) => {
        redis.select(ENV.RATELIMIT.REDIS_DB, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
    await redis.select(ENV.REDIS_DB)
    AppLogger.info('        [Redis] Redis initialized on ' + ENV.REDIS_HOST + ':' + ENV.REDIS_PORT + ' database ' + ENV.REDIS_DB)
    AppLogger.info('    [Redis] Redis loaded...')
}

export default loadRedis
