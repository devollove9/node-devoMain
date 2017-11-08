/**
 * Created by devollove9 on 2017/9/19.
 */
let preRedis = load( 'redis' );
let redisClient = preRedis.createClient( ENV.REDIS_PORT , ENV.REDIS_HOST );
let redis = load( 'co-redis' )( redisClient ).
module.exports = function* ( context ) {
    context.redis = redis;
    context.ratelimit = preRedis.createClient(ENV.RATELIMIT.REDIS_PORT,ENV.RATELIMIT.REDIS_HOST);
    yield new Promise( function( fulfill , reject ) {
        redis.select( ENV.RATELIMIT.REDIS_DB , function( err ) {
            if ( err ) reject( err );
            else fulfill();
        });
    });
    yield redis.select( ENV.REDIS_DB );
    context.Logger.get('app').info( 'INIT:  Redis initialized on ' + ENV.REDIS_HOST + ':' + ENV.REDIS_PORT + ' database: ' + ENV.REDIS_DB );
};
