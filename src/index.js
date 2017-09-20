/**
 * Created by devo on 4/26/2016.
 */
module.exports = function *(context) {
    let routesDirty = fs.readdirSync( __dirname );
    let moduleName = getModuleName( __dirname , 0 );
    let directoryName = getModuleName( __dirname , 0 , 'n' );
    AppLogger.info( moduleName + "Loading " + directoryName + " directory... " );
    for ( var route of routesDirty ) {
        var curRoute = path.resolve( __dirname, route );
        if ( curRoute !== __filename && route != 'routes' ) {
            AppLogger.info( getModuleName( curRoute , 1 ) + "Loading " + directoryName + " directory '" + route + "' from '" +  curRoute.replace( appRoot , '' ) + "'.");
            yield load( curRoute )(context);
            //if ( route != 'routes' ) yield load( curRoute )(context);
            //else yield load( curRoute );
        }
    } 
};