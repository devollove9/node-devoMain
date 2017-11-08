/**
 * Created by devo on 9/16/2016.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middleware/queryValidator' );
let crypt = load( 'libs/encryption/crypt' );
module.exports = [
    queryValidator( load( 'validation/auth/user' ) ),
    function* authUser( next ) {
        
        // Find User
        let user = yield models.User
            .findOne()
            .where( 'username' ).equals( this.params.username )
            .lean().exec();
        if ( !user ) throw errors.AUTHENTICATION.USER_NOT_EXIST;

        // Check User Disabled
        if ( user.disabled ) throw errors.AUTHENTICATION.USER_DISABLED;

        // Check Password
        if ( user.password !== crypt.encrypt( this.request.query.password ) ) throw errors.AUTHENTICATION.USERNAME_PASSWORD_INCORRECT;
        
        // Gather Permissions
        let userPermission = yield models.Permission.findOne().where( 'userId' ).equals( user.userId ).lean().exec();
        
        
        send( this , user );
        yield next;
}];