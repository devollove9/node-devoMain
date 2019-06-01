/**
 * Created by devo on 10/25/2017.
 * Required packages:
 *  jade
 */
import globals from './global'
import env from './env'
import redis from './redis'
import service from './service'
import template from './template'
import resource from './resource'
import prototypes from './prototype'

const preload = async (ctx) => {
    AppLogger.info('[Preload] Loading preload directory...')

    await prototypes(ctx)
    AppLogger.info('')
    
    await globals(ctx)
    AppLogger.info('')

    await env(ctx)
    AppLogger.info('')
    
    await redis(ctx)
    AppLogger.info('')

    await service(ctx)
    AppLogger.info('')

    await template(ctx)
    AppLogger.info('')

    await resource(ctx)
    AppLogger.info('')

    AppLogger.info('')
}

export default preload
