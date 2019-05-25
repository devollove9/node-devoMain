/**
 * Created by devo on 4/25/2016.
 */

// Require Flow Control
var co = require( "co" );

// Require Global File Loader
require( "./loader" );

global.ENV = {};
global.fs = load( 'fs' );
global.path = load( 'path' );

// Main Flow
co( function* () {
    let context = {};

    // Logger
    yield load( 'logger' )( global );
    
    // Load all global functions & variables
    yield load( './imagine' )( global );

    // Load preload functions & variables
    yield load( './preload' )( global );
    
    // Load app source
    yield load( './src' )( global );
    
    // Load app server
    let app = load( 'server' )( global );
    
    // Start app
    app.listen( ENV.SERVER_PORT );
    AppLogger.info('');
    AppLogger.info('****************************************************************');
    AppLogger.info('*********** Server started,listening on port:' + ENV.SERVER_PORT + ' **************');
    AppLogger.info('****************************************************************');
    console.log(String.fromCharCode(23));

}).catch(function(err) {
    console.error(err);
    console.error(err.stack || '');
    //NR.noticeError(err);
});