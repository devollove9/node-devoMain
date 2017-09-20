/**
 * Created by devo on 4/26/2016.
 */


module.exports = function *(context) {
    AppLogger.info( "[Preload] Loading preload directory..." );

    yield load( 'preload/env' );
    AppLogger.info( "" );
};