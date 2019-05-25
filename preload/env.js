/**
 * Created by devo on 4/26/2016.
 */
//let sprintf = load('sprintf').sprintf;
//let axios = load('axios');
let env = load('env.json');
let extend = load('deep-extend');
//let fs = load('co-fs');

module.exports = function* loadRedis(context) {
    let remoteEnv = {};
    /*
    if (process.env.NODE_ENV == 'CI') {
        remoteEnv = load( 'config.json' );
    } else {
        remoteEnv = yield axios.get(env.REMOTE_CONFIG);
        remoteEnv = remoteEnv.data;
    }
    */

    extend(remoteEnv,env);
    env = remoteEnv;
    /*
    Object.keys(env).forEach(function(key) {
        logger.info(sprintf(
            ' - %-30s  : %s',
            key,
            (typeof env[key] === 'object') ?
                JSON.stringify(env[key]) :
                env[key]));
    });
    logger.info('');
    logger.info('INIT:  environment variables loaded');
    logger.info('');

    if (env.DEBUG) {
        logger.info('   _____    ______   ____    _    _    _____');
        logger.info('  |  __ \\ |  ____| |  _ \\ | |  | |  / ____|');
        logger.info('  | |  | | | |__    | |_) | | |  | | | |  __ ');
        logger.info('  | |  | | |  __|   |  _ <  | |  | | | | |_ |');
        logger.info('  | |__| | | |____  | |_) | | |__| | | |__| |');
        logger.info('  |_____/  |______| |____/   \_____/  \_____|');
        logger.info('');
        logger.info('      __   __    ____    _____    ______       ')
        logger.info('     |  \\/  |  / __ \\ |  __ \\ |  ____|      ');
        logger.info('     | \\  / | | |  | | | |  | | | |__         ');
        logger.info('     | |\\/| | | |  | | | |  | | |  __|        ');
        logger.info('     | |   | | | |__| | | |__| | | |____       ');
        logger.info('     |_|   |_|  \\___/  |_____/  |______|      ');

    }
    logger.info('');*/
    ENV = extend( ENV ,env );
};