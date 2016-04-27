/**
 * Created by devo on 4/26/2016.
 */

module.exports = function *(context) {
    let routesDirty = fs.readdirSync( __dirname );   
    for ( var route of routesDirty ) {
        var curRoute = path.resolve( __dirname, route );
        if ( curRoute !== __filename ) {
            load( curRoute );
        }
    }
};