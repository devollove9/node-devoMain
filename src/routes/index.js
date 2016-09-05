/**
 * Created by devo on 4/26/2016.
 */

let router = load('koa-router')();

let methods = ['get', 'post', 'del', 'put'];

let routesDirty = [];
let routes = [];

for (let route of routesDirty) {
    if (path.basename(route, path.extname(route)) === 'index') continue;
    routes.push(route.substr(process.env.PWD.length + 1));
}
module.exports = router;