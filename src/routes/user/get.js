/**
 * Created by devollove9 on 2017/9/18.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middleware/queryValidator' );
let crypt = load( 'libs/encryption/crypt' );
let permissionFilter = load( 'middleware/permissionFilter' );
module.exports = [
    queryValidator( load( 'validation/user/get' ) ),
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
    ),
    function* userGet( next ) {
        let users = [];
        // Find User
        if ( this.params.userId ) {
            users = yield models.User
                .findOne()
                .where( 'userId' ).equals( this.params.username )
                .lean().exec();
        } else if ( this.params.username != undefined ) {
            users = yield models.User
                .where( 'username' ).regex( new RegExp( this.params.username , 'i' ) ).lean().exec();
        } else {
            users = yield models.User.find( {} ).lean().exec();
        }
        
        if ( ! users ) {
            throw errors.AUTHENTICATION.USER_NOT_EXIST 
        }

        send( this , users );
        yield next;
    }];