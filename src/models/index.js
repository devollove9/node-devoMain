/** 
 * Created by devo on Apr 27, 2016 
 * Project: devoMain  
 */

let mongoose = require( 'mongoose' );

module.exports = async ( context ) => {
    mongoose.connect( 'mongodb://localhost/production' );
    let moduleName = getModuleName( __dirname , 1 );
    AppLogger.info( moduleName + "Database connected." );
    let models = {};
    let routesDirty = fs.readdirSync( __dirname );
    for ( var route of routesDirty ) {
        var curRoute = path.resolve( __dirname , route );
        if ( curRoute !== __filename ) {
            let name = path.basename( route ).slice( 0 , -3 );
            models[ name ] = mongoose.model( name , load( curRoute ) );
            AppLogger.info(  getModuleName( curRoute , 2 ) + "Loaded model '" + name + "' from '" + curRoute.replace( appRoot , '' ) +"'." );
        }
    }    
    context.models = models;
    AppLogger.info( moduleName + "Database models loaded successfully." );
    AppLogger.info( '' );
};

