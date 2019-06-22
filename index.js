/**
 * Created by devo on 4/25/2016.
 */



import co from 'co'
import logger from './logger'
import preload from './preload'
import src from './src'
import server from './server'
import { loader } from '@/libs'

global.ENV = {};
global.load = loader

// Main Flow
co(async () => {
  // let context = {};

  // Logger
  await logger(global)

  // Load preload functions & variables
  await preload(global)

  // Load app source
  await src(global)

  // Load app server
  let app = server(global)

  // Start app
  app.listen(ENV.SERVER_PORT)
  AppLogger.info('');
  AppLogger.info('****************************************************************');
  AppLogger.info('          Server started ['+process.env.NODE_ENV.toUpperCase() + '],listening on port:' + ENV.SERVER_PORT);
  AppLogger.info('****************************************************************');
  console.log(String.fromCharCode(23));

}).catch((err) => {
  console.error(err)
  console.error(err.stack || '')
})