/**
 * Created by devollove9 on 2017/8/13.
 */
let sprintf = load('sprintf').sprintf;
module.exports = function errorHandler() {
    return function* errorHandler(next) {
        let error;
        let start;
        let logger = Logger.get('logstash');
        this.errorCode = 200;
        try {
            start = new Date;
            yield next;
        } catch (err) {
            error = err;
            if (err.status === 408) {
                this.errorCode  = 408;
                err = {
                    errorCode:408,
                    errorMessage:'You request has timed out'
                }
            }

            if ((err.errorCode === undefined ||
                err.errorMessage === undefined)) {
                if (err.status === 400 && !err.moreInfo) {
                    this.errorCode = 422;
                    err = {
                        errorCode: 422,
                        errorMessage: 'The requested parameters are not processable',
                        errorDetail: 'JSON malformated'
                    };
                } else {
                    console.log( err );
                    this.errorCode = 500;
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
                this.errorCode = err.errorCode || 500;
                logger.info(
                    sprintf(
                        '%-4s %-5d  %-80s  %-15s  %dms',
                        this.method,
                        err.errorCode || 500,
                        this.url,
                        this.headers['x-forwarded-for'] || this.ip,
                        new Date - start));
            }
            this.status = 200;
            this.body = JSON.stringify({
                error:err
            });
            this.result = {
                error:err
            };
        }
        if (error === undefined) {
            let status = this.status;
            logger.info(
                sprintf(
                    '%-4s %-5d  %-80s  %-15s  %dms',
                    this.method,
                    status,
                    this.url,
                    this.headers['x-forwarded-for'] || this.ip,
                    new Date - start));
        }
    };
};