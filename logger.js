/**
 * Created by devollove9 on 8/27/2016.
 */
import log4js from 'log4js'
import log from './config/log.js'

const loadLog = (ctx) => {
  log4js.configure(log)
  ctx.Logger = {
    get: function get (name) {
      let logger = log4js.getLogger(name)
      if (name === 'logstash') logger.level = 'DEBUG'
      // logger.level = 'INFO'
      if (ENV.DEBUG) logger.level = 'TRACE'
      return logger
    }
  }
  ctx.Logger.get('app').info('INIT:  Log4Js initialized.')
  ctx.AppLogger = ctx.Logger.get('app')
}

export default loadLog
