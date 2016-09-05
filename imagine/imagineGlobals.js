/** 
 * Created by devo on Apr 27, 2016 
 * Project: devoMain  
 */
// Global Modules
global.AppLogger = Logger.get( 'app' );
AppLogger.info( "Loading Global Modules...." );
global.fs = load( 'fs' );
console.log( 'loading fs' );
global.path = load( 'path' );
global.walk = load( 'libs/walkThrough' );

