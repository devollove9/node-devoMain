/**
 * Created by devollove9 on 2017/10/26.
 */
import Sprintf from 'sprintf'

let sprintf = Sprintf.sprintf
const errorHanlder = () => {
    let errorHandler = async (ctx, next) => {
        let error, start
        let logger = Logger.get('logstash')
        ctx.errorCode = 200
        try {
            start = new Date()
            await next()
        } catch (err) {
            error = err
            if (err.status === 408) {
                ctx.errorCode = 408
                error = {
                    errorCode: 408,
                    errorMessage: 'You request has timed out'
                }
            }

            if (err.errorCode === undefined || err.errorMessage === undefined) {
                if (err.status === 400 && !err.moreInfo) {
                    ctx.errorCode = 422
                    error = {
                        errorCode: 422,
                        errorMessage: 'The requested parameters are not processable',
                        errorDetail: 'JSON malformated'
                    }
                } else {
                    ctx.errorCode = 500
                    if (!ENV.DEBUG) {
                        // NR.noticeError(err)
                        error = {
                            errorCode: 500,
                            errorMessage: 'Internal error'
                        }
                    } else {
                        logger.error(error)
                        if (error.stack) {
                            let stack = err.stack.split('\n')
                            let cerr = {}
                            cerr[error.message] = {}
                            cerr[error.message][stack[0]] = {}
                            for (let i = 1; i < stack.length; i++) {
                                let a = stack[i].split('(')
                                if (a.length === 1) {
                                    cerr[error.message][stack[0]][a[0].substr(7)] = ''
                                } else {
                                    cerr[error.message][stack[0]][a[0].substr(7)] =
                                        a[1].substr(0, a[1].length - 1)
                                }
                            }
                            error = cerr
                        }
                    }
                }
            } else {
                ctx.errorCode = error.errorCode || 500
                logger.error(
                    sprintf(
                        '%-4s %-5d  %-30s  %-15s  %dms',
                        ctx.request.method,
                        error.errorCode || 500,
                        ctx.request.url,
                        ctx.request.header['x-forwarded-for'] || ctx.request.header['x-real-ip'],
                        new Date() - start))
            }
            ctx.response.status = 200
            ctx.body = JSON.stringify({
                error: error
            })
            ctx.result = {
                error: error
            }
        }
        if (error === undefined) {
            let status = ctx.response.status
            logger.info(
                sprintf(
                    '%-4s %-5d  %-30s  %-15s  %dms',
                    ctx.request.method,
                    status,
                    ctx.request.url,
                    ctx.request.header['x-forwarded-for'] || ctx.request.header['x-real-ip'],
                    new Date() - start))
        }
    }
    return errorHandler
}

export default errorHanlder
