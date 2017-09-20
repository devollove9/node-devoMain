/** 
 * Created by devo on Apr 27, 2016 
 * Project: devoMain  
 */
// Global Modules
AppLogger.info( "    [Global] Loading global modules from 'imagine/imagineGlobals.js'." );

global.fs = load( 'fs' );
AppLogger.info( "    [Global] Global module 'fs' loaded ." );

global.path = load( 'path' );
AppLogger.info( "    [Global] Global module 'path' loaded ." );

global.walk = load( 'libs/common/walkThrough' );
AppLogger.info( "    [Global] Global module 'walk' loaded ." );

global.getModuleName = load( 'libs/common/getModuleName' );
AppLogger.info( "    [Global] Global module 'getModuleName' loaded ." );

AppLogger.info( "    [Global] Global modules loaded successfully." );
