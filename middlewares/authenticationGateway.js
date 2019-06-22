import { errors } from '@/constants'

const authGateway = (config) => {
  return async (ctx, next) => {
    let excludes = [];
    /***
     * format:
     * method:'GET',
     * path:'/user/email'
     */
    if (ctx.request.header) {
      if (ctx.request.header['x-real-ip']) {
        ctx.ipReal = ctx.request.header['x-real-ip'];
      }
      if (ctx.request.header['x-forwarded-for']) {
        ctx.ipForward = ctx.request.header['x-forwarded-for'];
      }
    }
    if (config !== undefined) {
      if (config.PUBLIC_ROUTES !== undefined) {
        excludes = config.PUBLIC_ROUTES;
      }
    }
    ctx.token = {};
    let authToken = ctx.headers['authentication-token'];

    let method = ctx.method;
    if ( ctx.url.substr(0, 7) === '/public') {
      await next();
      return
    }
    for (let i = 0; i < excludes.length; i++) {
      let exclude = excludes[i];
      if (method.toLowerCase() === exclude.method.toLowerCase()) {
        if (ctx.url.substr(0, exclude.path.length).toLowerCase() ===
          exclude.path.toLowerCase()) {
          await next();
          return;
        }
      }
    }
    let pubToken = {
      // userId:'0123456789ABCDEF987654',
      role:['public'],
      permission:[{
        role:'public',
        action:['*'],
        criteria:{
          // userId:'0123456789ABCDEF987654'
        }
      }]
    }
    if (authToken === undefined) {
      ctx.token = pubToken
    } else if (authToken === '') {
      ctx.token = pubToken
    } else {
      let result = await redis.get(authToken);
      if (result === null) {
        throw errors.AUTHENTICATION.AUTHENTICATION_FAILURE;
      } else {
        ctx.token = JSON.parse(result.toString());
      }

    }
    await next();
  };
};

export default authGateway;
