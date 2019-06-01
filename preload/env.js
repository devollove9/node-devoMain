/**
 * Created by devo on 10/25/2017.
 */
import extend from 'extend'
let env = require(process.env.PWD+'/'+ 'env.json')

const loadEnv = async (ctx) => {
    AppLogger.info('    [ENV] Loading ENV...')
    let remoteEnv = {}
    extend(true, remoteEnv, env)
    env = remoteEnv
    ENV = extend(true, ENV, env)
    AppLogger.info('    [ENV] ENV loaded...')
}

export default loadEnv
