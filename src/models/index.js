/** 
 * Created by devo on Apr 27, 2016 
 * Project: devoMain  
 */

let mongoose = require( 'mongoose' );

module.exports = function *(context) {
    mongoose.connect( 'mongodb://localhost/production' );
    let models = {};
    let routesDirty = fs.readdirSync( __dirname );
    for ( var route of routesDirty ) {
        var curRoute = path.resolve( __dirname, route );
        if ( curRoute !== __filename ) {
            let name = path.basename( route ).slice(0,-3);
            models[name]=mongoose.model( name , load( curRoute ) );
        }
    }    
    context.models=models;
};

