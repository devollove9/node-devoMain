/** 
 * Created by devo on Apr 27, 2016 
 * Project: devoMain  
 */
module.exports = function * ( context ) {
    AppLogger.info( "[Imagine] Loading imagine directory..." );
    load( 'imagine/imagineBasics' );
    load( 'imagine/imagineGlobals' );
    load( 'imagine/imagineFunction' );
    AppLogger.info( "" );
};


