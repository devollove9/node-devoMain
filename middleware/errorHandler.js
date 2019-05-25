/**
 * Created by devollove9 on 2017/8/13.
 */
let sprintf = load('sprintf').sprintf;
module.exports = function errorHandler() {
    return async (ctx, next) => {
        let error;
        let start;
        let logger = Logger.get('logstash');
        ctx.errorCode = 200;
        try {
            start = new Date;
            await next();
        } catch (err) {
            error = err;
            if (err.status === 408) {
                ctx.errorCode  = 408;
                err = {
                    errorCode:408,
                    errorMessage:'Your request has timed out'
                }
            }

            if (err.errorCode === undefined || err.errorMessage === undefined) {
                if (err.status === 400 && !err.moreInfo) {
                    ctx.errorCode = 422;
                    err = {
                        errorCode: 422,
                        errorMessage: 'The requested parameters are not processable',
                        errorDetail: 'JSON malformated'
                    };
                } else {
                    console.log( err );
                    ctx.errorCode = 500;
                    if (!ENV.DEBUG) {
                        //NR.noticeError(err);
                        err = {
                            errorCode: 500,
                            errorMessage: 'Internal error'
                        };
                    } else {
                        logger.error(err);
                        if (err.stack) {
                            let stack = err.stack.split('\n');
                            let cerr = {};
                            cerr[err.message] = {};
                            cerr[err.message][stack[0]] = {};
                            for (let i = 1; i < stack.length; i++) {
                                let a = stack[i].split('(');
                                if (a.length === 1) {
                                    cerr[err.message][stack[0]][a[0].substr(7)] = '';
                                } else {
                                    cerr[err.message][stack[0]][a[0].substr(7)] =
                                        a[1].substr(0, a[1].length - 1);
                                }
                            }
                            err = cerr;
                        }
                    }
                }
            } else {
                ctx.errorCode = err.errorCode || 500;
                logger.info(
                    sprintf(
                        '%-4s %-5d  %-80s  %-15s  %dms',
                        ctx.method,
                        err.errorCode || 500,
                        ctx.url,
                        ctx.headers['x-forwarded-for'] || ctx.ip,
                        new Date - start));
            }
            ctx.status = 200;
            ctx.body = JSON.stringify({
                error:err
            });
            ctx.result = {
                error:err
            };
        }
        if (error === undefined) {
            let status = ctx.status;
            logger.info(
                sprintf(
                    '%-4s %-5d  %-80s  %-15s  %dms',
                    ctx.method,
                    status,
                    ctx.url,
                    ctx.headers['x-forwarded-for'] || ctx.ip,
                    new Date - start));
        }
    };
};