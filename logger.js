/**
 * Created by devollove9 on 8/27/2016.
 */
var log4js 		= load('log4js');

module.exports=function* loadLog(context) {
    let json=load( '/config/log.json' );
    log4js.configure( { appenders:json } );
    context.Logger={
        get:function get( name )  {
            let logger= log4js.getLogger( name );
            logger.setLevel( 'INFO' );
            if ( ENV.DEBUG ) logger.setLevel( 'TRACE' );
            return logger;
        }
    };
    context.Logger.get( 'app' ).info( 'INIT:  Log4Js initialized.' );
};
