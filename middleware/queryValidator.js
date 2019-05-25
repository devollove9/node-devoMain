/**
 * Created by devollove9 on 2017/9/17.
 */
let joi = load( 'libs/dataParse/joiValidate' );
let errors = load( 'constants/errors' );
module.exports = function queryValidator( validation ) {
    return async (ctx, next) => {
        let requestQuery = ctx.query;
        if ( ctx.method.toLowerCase() === 'get' ) {
            requestQuery = ctx.query;
        } else {
            requestQuery = ctx.request.body;
        }
        if ( requestQuery === undefined ) {
            throw errors.HTTP[ '422' ];
        }
        
        let result = joi.validate( requestQuery , validation );
        if ( result.error ) {
            let error = {};
            error.errorCode = errors.HTTP[ '422' ].errorCode;
            error.errorMessage = errors.HTTP[ '422' ].errorMessage;
            //if ( this.headers[ 'x-response-errordetail' ] ) {
                error.errorDetail = result.error;
            //}
            throw error;
        } else {
            ctx.params = result.value;
        }
        await next();
    };
};