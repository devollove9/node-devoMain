/**
 * Created by devo on 4/26/2016.
 */

let router = load( 'koa-router' )();
let sprintf = load( 'sprintf' ).sprintf;
let methods = [ 'get' , 'post' , 'del' , 'put' ];

let routesDirty = walk( __dirname );
let routes = [];

for ( let route of routesDirty ) {
    if ( path.basename( route , path.extname( route ) ) === 'index' ) continue;
    routes.push( route.substr( process.env.PWD.length + 1 ) );

}
AppLogger.info( "    [Routes] Loading src directory 'routes' from 'src/routes'." );
for( let route of routes ) {
    
    let ctrl = load( route );

    let p = getModuleName( route , 1 , 'c' );
    let method = path.basename( route , path.extname( route ) );
    let url = route.substr( 10 );
    if( methods.indexOf( method ) === -1 ) {
        method = 'get';
        url = url.substr( 0 , url.length - 3 );
    } else {
        url = url.substr( 0 , url.length - method.length - 4 );
    }
    let args = [ url ];

    Array.prototype.push.apply( args , ctrl );
    router[ method ].apply( router , args );

    AppLogger.info(
        sprintf( '        [%-5s %-30s     ---->   %-s' , method.toUpperCase() + ']' , url , route )
    );
}
AppLogger.info( "    [Routes] Routes loaded successfully." );
module.exports = router;