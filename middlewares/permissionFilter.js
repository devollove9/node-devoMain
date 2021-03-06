/**
 * Created by devollove9 on 2017/10/26.
 */
import { errors } from '@/constants'
import _ from 'underscore'
import deepCopy from 'deepcopy'
/*
 * :key  req.params.key
 * key   permission.criteria.key
 * _key  token.key
 * $key  key
 */

const getDeep = (obj, key) => {
    let arr = key.split('.')
    if (arr.length === 1) {
        return obj[ key ]
    } else {
        return getDeep(obj[ arr[ 0 ] ], arr.slice(1).join('.'))
    }
}

const transcript = (perm, key) => {
    if (!_.isString(key)) {
        return key
    }
    if (key[ 0 ] === ':') {
        return getDeep(this.params, key.substr(1))
    } else if (key[ 0 ] === '_') {
        return this.token[ key.substr(1) ]
    } else if (key[ 0 ] === '$') {
        return key.substr(1)
    }
    return perm.criteria[ key ]
}

const matchWildcard = (src, target) => {
    let a1 = src.split('.')
    let a2 = target.split('.')
    for (let i = 0; i < a1.length; i++) {
        if (a1[ i ] === '*') return true
        if (a1[ i ] !== a2[ i ]) return false
    }
    return true
}

const validate = (role, action, criteria, permission) => {
    for (let perm of (permission || [ ])) {
        if (perm.role !== role) continue
        let flag = false
        for (let a of perm.action) {
            flag |= matchWildcard(a, action)
        }
        if (!flag) continue
        flag = false
        for (let a of (perm.restrict || [ ])) {
            flag |= matchWildcard(a, action)
        }
        if (flag) continue
        let f = true
        for (let key of Object.keys(criteria)) {
            let lhs = transcript.call(this, perm, key)
            let rhs = transcript.call(this, perm, criteria[ key ])
            f &= (lhs === rhs)
        }
        if (!f) continue
        return true
    }
    return false
}

export default (permission) => {
    return async (ctx, next) => {
        let userPermission = [ ]
        for (let i = 0; i < permission.length; i++) {
            userPermission.push(deepCopy(permission[ i ]))
        }
        let flag = false
        ctx.roles = []
        for (let i = 0; i < userPermission.length; i++) {
            let p = userPermission[ i ]
            let result = validate.call(ctx, p.role, p.action, p.criteria, ctx.token.permission)
            if (result) {
                ctx.roles.push(p.role)
            }
            flag = flag || result
        }
        if (!flag) {
            throw errors.AUTHENTICATION.UNAUTHORIZED
        } else {
            await next()
        }
    }
}
