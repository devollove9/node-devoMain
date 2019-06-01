/**
 * Created by devollove9 on 2017/10/27.
 * All library functions
 * Request packages:
 *  underscore
 *  microtime
 *  joi
 *  debug
 *  koa-ratelimit
 *  ms
 *  thenify
 *  crypto(built-in)
 *  fs(built-in)
 *  path(built-in)
 */
import getModuleName from './common/getModuleName'
import send from './common/send'
import walkThrough from './common/walkThrough'
import flatten from './common/flatten'

import joiValidate from './dataParse/joiValidate'

import saveRedisSession from './redis/saveRedisSession'

import crypt from './encryption/crypt'

import idGenerator from './idGenerator'
import rateLimit from './rateLimit'
import loader from './loader'

const iLib = {
    getModuleName: getModuleName,
    send: send,
    walkThrough: walkThrough,
    flatten: flatten,

    joiValidate: joiValidate,

    saveRedisSession: saveRedisSession,

    crypt: crypt,

    idGenerator: idGenerator,
    loader: loader,
    rateLimit: rateLimit
}

export {
    getModuleName,
    send,
    walkThrough,
    flatten,
    joiValidate,
    saveRedisSession,
    crypt,
    idGenerator,
    loader,
    rateLimit
}
export default iLib
