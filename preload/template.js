/**
 * Created by devo on 10/31/2017.
 */
import Sprintf from 'sprintf'
import fs from 'fs'
import path from 'path'
import pug from 'pug'

let sprintf = Sprintf.sprintf

const loadTemplates = async (ctx) => {
    AppLogger.info('    [Templates] Loading templates...')
    let files = fs.readdirSync(process.env.PWD + '/assets/templates')
    let templates = {}
    for (let file of files) {
        let ext = path.extname(file)
        let key = path.basename(file, ext).dotToCamel()
        templates[key] = pug.compile(
            fs.readFileSync(process.env.PWD + '/assets/templates/' + file),
            {
                filename: path.join(process.env.PWD + '/assets/templates', file),
                pretty: true
            }
        )
        AppLogger.info(sprintf('       -  %20s  complied from     assets/templates/%-40s', key, file))
    }
    ctx.templates = templates
    AppLogger.info('    [Templates] Templates loaded...')
}

export default loadTemplates
