/**
 * Created by devollove9 on 2017/9/19.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middleware/queryValidator' );
let permissionFilter = load( 'middleware/permissionFilter' );

module.exports = [
    queryValidator( load( 'validation/user/permission/put' ) ),
    permissionFilter(
        {
            role: 'superAdmin',
            action: 'user.permission.put',
            criteria: {}
        },{
            role:'rootAdmin',
            action:'user.permission.put',
            criteria:{
            }
        },{
            role:'owner',
            action:'user.permission.put',
            criteria:{
            }
        }
    ),
    function * userPermissionPut( next ) {
        let permission;
        if ( this.params.userId ) {
            permission = yield models.Permission
                .findOne()
                .where( 'userId' ).equals( this.params.userId )
                .lean().exec();
        } else if ( this.params.permissionId ) {
            permission = yield models.Permission
                .findOne()
                .where( 'permissionId' ).equals( this.params.permissionId )
                .lean().exec();
        }
        
        if ( ! permission ) {
            throw errors.USER.USER_PERMISSION_NOT_EXIST;
        }
        for ( let p of ( this.params.permission || [] ) ) {
            let perm = {};
            perm.role = p.role;
            perm.action = p.action;
            perm.restrict = p.restrict;
            perm.parameter = [];
            for ( let k of Object.keys( p.parameter || {} ) ) {
                perm.parameter.push(
                    {
                        key:k,
                        value:p.parameter[ k ]
                    }
                );
            }
            permission.permission.push( perm );
        }
        yield permission.save();
        send( this , permission );
        yield next;
    }
];