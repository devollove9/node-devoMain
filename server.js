
const koa = require( 'koa' );
let app = koa();
//let router = load('koa-router')();
const gzip = load( 'koa-gzip' );
const bodyParser = load('koa-bodyparser');

module.exports = (context) => {
    context.send = function send( ctx , body ) {
        ctx.status = 200;
        ctx.result =  {
            data: body,
            error: {}
        };
        ctx.body = JSON.stringify( {
            data:body,
            error:{}
        } );
    };
    app.use( bodyParser() );
    app.use( load('middleware/errorHandler' )());
    app.use( gzip() );
    app.use( load('src/routes').routes() );
    return app;
};





