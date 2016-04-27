/**
 * Created by devo on 4/26/2016.
 */
let _ = load('underscore');
let router = load('koa-router')();
let sprintf = load('sprintf').sprintf;



let methods = ['get', 'post', 'del', 'put'];

let routesDirty = walk('./routes');
let routes = [];

for (let route of routesDirty) {
    if (path.basename(route, path.extname(route)) === 'index') continue;
    routes.push(route.substr(process.env.PWD.length + 1));
}
console.log( routes );
module.exports = router;