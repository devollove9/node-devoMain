/**
 * Created by devo on 4/25/2016.
 */

// Require Flow Control
var co = require( "co" );

// Require Global File Loader
require( "./loader" );

// Main Flow
co( function* () {
    let context = {};
    // Load all global functions & variables
    yield load( './imagine' )( global );
    
    // Load app source
    yield load( './src' )( global );
    
    // Load app server
    let app = load( 'server' )( global );
    
    // Start app
    app.listen( 3000 );
    
}).catch(function(err) {
    console.error(err);
    console.error(err.stack || '');
    //NR.noticeError(err);
});