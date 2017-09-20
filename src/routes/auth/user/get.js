/**
 * Created by devo on 9/16/2016.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middlewares/queryValidator' );
let crypt = load( 'libs/encryption/crypt' );
module.exports = [
    queryValidator( load( 'validation/auth/user' ) ),
    function* userGet( next ) {
        let users = models.User;
        let username = this.params.username;
        let user = yield users
            .findOne()
            .where( 'username' ).equals( username )
            .lean().exec();
        if ( !user ) throw errors.AUTHENTICATION.USER_NOT_EXIST;

        // Check User Disabled
        if ( user.disabled ) throw errors.AUTHENTICATION.USER_DISABLED;

        // Check Password
        if ( user.password !== crypt.encrypt( this.request.query.password ) ) throw errors.AUTHENTICATION.USERNAME_PASSWORD_INCORRECT;
        
        send( this , user );
        yield next;
}];