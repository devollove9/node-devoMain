/**
 * Created by devo on 4/26/2016.
 */
import fs from 'fs'
import path from 'path'
import { loader as load, getModuleName } from '@/libs'

const src = async (ctx) => {
  // Get routes from current directory
  let routesDirty = fs.readdirSync(__dirname)

  // Get formatted module name
  let moduleName = getModuleName(__dirname, 0)

  // Get formatted directory name
  let directoryName = getModuleName(__dirname, 0, 'n')

  // Print log info
  AppLogger.info(moduleName + 'Loading ' + directoryName + ' directory... ')

  // Load entries in current directory
  for (let route of routesDirty) {
    let curRoute = path.resolve(__dirname, route)
    if (curRoute !== __filename && route !== 'routes') {
      AppLogger.info(getModuleName(curRoute, 1) + 'Loading ' + directoryName + " directory '" + route + "' from '" + curRoute.replace(appRoot, '') + "'.")
      await load(curRoute).default(ctx)
      // if ( route != 'routes' ) yield load( curRoute )(context);
      // else yield load( curRoute );
    }
  }
}

export default src
