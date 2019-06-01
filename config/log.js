const log = {
  appenders: {
    app: { type: 'console', filename: '/data/log/node/app.log' },
    log4js: { type: 'log4js-logstash', host: 'localhost', port: '5001' }
  },
  categories: {
    default: { appenders: [ 'app' ], level: 'INFO' },
    log4js: { appenders: [ 'log4js' ], level: 'DEBUG' }
  }
}

module.exports = log