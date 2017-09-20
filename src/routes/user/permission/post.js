/**
 * Created by devollove9 on 2017/9/19.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middleware/queryValidator' );
let permissionFilter = load( 'middleware/permissionFilter' );
let generateId 	= load( 'libs/idGenerator' );

module.exports = [
    queryValidator( load( 'validation/user/permission/post' ) ),
    permissionFilter(
        {
            role:'superAdmin',
            action:'user.permission.post',
            criteria: {}
        },{
            role:'rootAdmin',
            action:'user.permission.post',
            criteria:{}
        },{
            role:'owner',
            action:'user.permission.post',
            criteria:{}
        }
    ),
    function * userPermissionPost(next) {
        let permission = new models.Permission();
        let user = yield models.User
            .findOne()
            .where('userId').equals( this.params.userId )
            .lean().exec();
        if ( !user ) throw errors.AUTHENTICATION.USER_NOT_EXIST;
        permission.userId = user.userId;
        permission.permissionId = generateId();
        permission.permission = [];
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