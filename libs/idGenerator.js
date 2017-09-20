/**
 * Created by devollove9 on 2017/9/19.
 */

var stringUtil = load( 'underscore.string' );
var microtime = load( 'microtime' );

module.exports=function( machineId , groupId ) {
    machineId = machineId || ENV.MACHINE;
    groupId = groupId || ENV.GROUP;
    groupId = parseInt( groupId.toString().substr( 0 ,1 ) ).toString();
    var machine = stringUtil.pad( machineId.toString( 16 ) , 4 , '0' );
    var pid = stringUtil.pad( process.pid.toString( 16 ) , 4 , '0' );
    var i = microtime.now().toString( 16 );
    return groupId + machine + pid + i;
}
