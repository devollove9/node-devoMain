/**
 * Created by devollove9 on 2017/9/18.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middleware/queryValidator' );
let permissionFilter = load( 'middleware/permissionFilter' );
module.exports = [
    queryValidator( load( 'validation/user/get' ) ),
  /*
    permissionFilter(
        {
            role: 'user',
            action: 'user.get',
            criteria: {
                '_userId': ':userId'
            }
        },{
            role: 'admin',
            action: 'user.get',
            criteria: {}
        },{
            role: 'superAdmin',
            action: 'user.get',
            criteria: {}
        },{
            role:'rootAdmin',
            action:'user.get',
            criteria:{
            }
        },{
            role:'owner',
            action:'user.get',
            criteria:{
            }
        }
    ),*/
    async (ctx, next) => {
    console.log('asd')
        let users = [];
        // Find User
        AppLogger.info( 'Getting User');
        if ( ctx.params.userId ) {
            users = await models.User
                .findOne()
                .where( 'userId' ).equals( ctx.params.username )
                .lean().exec();
        } else if ( ctx.params.username !== undefined ) {
            users = await models.User
                .where( 'username' ).regex( new RegExp( ctx.params.username , 'i' ) ).lean().exec();
        } else {
            users = await models.User.find( {} ).lean().exec();
        }
        
        if ( ! users ) {
            throw errors.AUTHENTICATION.USER_NOT_EXIST 
        }

        send( ctx , users );
        await next();
    }];