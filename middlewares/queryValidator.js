/**
 * Created by devollove9 on 2017/9/17.
 */
var joi = load( 'libs/dataParse/joiValidate' );
module.exports = function queryValidator( validation ) {
    return function * queryValidator( next ) {
        let requestQuery = this.query;
        if ( this.method.toLowerCase() === 'get' ) {
            requestQuery = this.query;
        } else {
            requestQuery = this.request.body;
        }
        if ( requestQuery === undefined ) {
            throw errors.HTTP[ '422' ];
        }
        
        let result = joi.validate( requestQuery , validation );
        if ( result.error ) {
            var error = {};
            error.errorCode = errors.HTTP[ '422' ].errorCode;
            error.errorMessage = errors.HTTP[ '422' ].errorMessage;
            if ( this.headers[ 'x-response-errordetail' ] ) {
                error.errorDetail = result.error;
            }
            throw error;
        } else {
            this.params = result.value;
        }
        yield next;
    };
};