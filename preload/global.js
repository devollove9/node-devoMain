/**
 * Created by devo on 10/25/2017.
 */
import { send } from '@/libs'

const globals = (ctx) => {
    AppLogger.info('    [Globals] Loading Globals...')
    ctx.ENV = {}
    ctx.appRoot = process.cwd() + '/'
    ctx.send = send
    AppLogger.info('    [Globals] Globals loaded...')
}

export default globals
