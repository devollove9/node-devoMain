/**
 * Created by devo on 10/31/2017.
 */
import Sprintf from 'sprintf'
import fs from 'fs'
import path from 'path'

let sprintf = Sprintf.sprintf

const loadResources = async (ctx) => {
    AppLogger.info('    [Resources] Loading resources...')
    let files = fs.readdirSync(process.env.PWD + '/assets/resources')
    let resources = {}
    let extensions = ['.png', '.jpg', '.html']
    for (let file of files) {
        let ext = path.extname(file)
        let key = path.basename(file, ext).dotToCamel()
        if (extensions.indexOf(ext) !== -1) {
            resources[key] = fs.readFileSync(process.env.PWD + '/assets/resources/' + file)
            AppLogger.info(sprintf('         - assets/resources/%-40s loaded', file))
        }
    }
    ctx.resources = resources
    AppLogger.info('    [Resources] Resources loaded...')
}

export default loadResources
