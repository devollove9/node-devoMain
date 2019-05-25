/**
 * Created by devollove9 on 2017/9/19.
 */
let errors = load( 'constants/errors' );
let queryValidator = load ( 'middleware/queryValidator' );
let permissionFilter = load ( 'middleware/permissionFilter' );

module.exports = [
    queryValidator( load( 'validation/user/permission/get') ),
    permissionFilter(
        {
            role: 'superAdmin',
            action: 'user.permission.get',
            criteria: {}
        },{
            role:'rootAdmin',
            action:'user.permission.get',
            criteria:{
            }
        },{
            role:'owner',
            action:'user.permission.get',
            criteria:{
            }
        }
    ),
    async () => {
        let permission = [];
        if ( this.params ) {
            permission = await models.Permission
                .find( this.params )
                .lean().exec();
        } else {
            permission = await models.Permission
                .find( {} )
                .lean().exec();
        }
        if ( ! permission ) {
            throw errors.USER.USER_PERMISSION_NOT_EXIST;
        }
        send( this , permission );
        await next();
    }

];