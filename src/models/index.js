/**
 * Created by devo on 10/25/2017.
 * Automatically load all models
 */
import fs from 'fs'
import path from 'path'
import { loader, getModuleName } from '@/libs'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

export default async (ctx) => {
    // Connect to database using URL
    mongoose.Promise = bluebird
    let db = mongoose.createConnection(ENV.MONGODB_URL, { useMongoClient: true })
    // mongoose.connect( ENV.MONGODB_URL );

    // Get current module name
    let moduleName = getModuleName(__dirname, 1)

    // Print log info
    AppLogger.info(moduleName + 'Database connected.')

    let models = {}

    // Get routes from current directory
    let routesDirty = fs.readdirSync(__dirname)

    // Load entries in current directory
    for (let route of routesDirty) {
        let curRoute = path.resolve(__dirname, route)
        if (curRoute !== __filename) {
            let name = path.basename(route).slice(0, -3)
            models[ name ] = db.model(name, loader(curRoute).default)
            AppLogger.info(getModuleName(curRoute, 2) + "Loaded model '" + name + "' from '" + curRoute.replace(appRoot, '') + "'.")
        }
    }

    ctx.models = models

    AppLogger.info(moduleName + 'Database models loaded successfully.')
    AppLogger.info('')
}
