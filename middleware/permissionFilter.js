/**
 * Created by devollove9 on 2017/9/18.
 */

let errors = load( 'constants/errors' );
let _ = load( 'underscore' );
let deepCopy = load( 'deepcopy' );

/*
 * :key  req.params.key
 * key   permission.criteria.key
 * _key  token.key
 * $key  key
 */

function getDeep( obj , key ) {
    let arr = key.split( '.' );
    if ( arr.length == 1 ) {
        return obj[ key ];
    } else {
        return getDeep( obj[ arr[ 0 ] ] , arr.slice( 1 ).join( '.' ) );
    }
}

function transcript( perm , key ) {
    if ( !_.isString( key ) ) {
        return key;
    }
    if ( key[ 0 ] === ':' ) {
        return getDeep( this.params , key.substr( 1 ) );
    } else if ( key[ 0 ] === '_' ) {
        return this.token[ key.substr( 1 ) ];
    } else if ( key[ 0 ] === '$' ) {
        return key.substr( 1 );
    }
    return perm.criteria[ key ];
}

function matchWildcard( src , target ) {
    let a1 = src.split( '.' );
    let a2 = target.split( '.' );
    for ( let i= 0;i<a1.length;i++ ) {
        if ( a1[ i ] == '*' ) return true;
        if ( a1[ i ] != a2[ i ] ) return false;
    }
    return true;
}

function validate( role , action , criteria , permission ) {
    for ( let perm of ( permission || [ ] ) ) {
        if ( perm.role !== role ) continue;
        let flag = false;
        for ( let a of perm.action ) {
            flag |= matchWildcard( a , action );
        }
        if ( !flag ) continue;
        flag = false;
        for ( let a of ( perm.restrict || [ ] ) ) {
            flag |= matchWildcard( a , action )
        }
        if ( flag ) continue;
        let f = true;
        for ( let key of Object.keys( criteria ) ) {
            let lhs = transcript.call( this , perm , key );
            let rhs = transcript.call( this , perm , criteria[ key ] );
            f &= ( lhs == rhs );
        }
        if ( !f ) continue;
        return true;
    }
    return false;
}

module.exports = function permissionFilter( permission ) {
    return function* permissionFilter( next ) {
        let userPermission = [ ];
        for ( let i = 0; i < permission.length; i++ ) {
            userPermission.push( deepCopy( permission[ i ] ) );
        }
        let flag = false;
        this.roles = [];
        for ( let i = 0; i < userPermission.length; i++ ) {
            let p 		= userPermission[ i ];
            let result 	= validate.call( this , p.role , p.action , p.criteria , this.token.permission );
            if ( result ) {
                this.roles.push( p.role );
            }
            flag = flag || result;
        }
        if ( !flag ) {
            yield next;
            //throw errors.AUTHENTICATION.UNAUTHORIZED;
        } else {
            yield next;
        }
    }
};