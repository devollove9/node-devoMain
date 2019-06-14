/**
 * Created by devollove9 on 2017/10/26.
 */
import Router from 'koa-router'
import Sprintf from 'sprintf'
import { loader, walkThrough as walk } from '@/libs'
import { mongoIdHandler } from '@/middlewares'
import path from 'path'

const loadRoutes = () => {
    let methods = [ 'get', 'post', 'del', 'put' ];
    let sprintf = Sprintf.sprintf;
    let router = Router();
    let routesDirty = walk(__dirname);
    let routes = [];

    for (let route of routesDirty) {
        if (path.basename(route, path.extname(route)) === 'index') continue;
        routes.push(route.substr(process.env.PWD.length + 1))
    }
    AppLogger.info("    [Routes] Loading src directory 'routes' from 'src/routes'.");

    for (let route of routes) {
        let ctrl = loader(route).default;

        let method = path.basename(route, path.extname(route));
        let url = route.substr(10)
        if (methods.indexOf(method) === -1) {
            method = 'get';
            url = url.substr(0, url.length - 3)
        } else {
            url = url.substr(0, url.length - method.length - 4)
        }
        let args = [ url ];
        if (ctrl) ctrl.push(mongoIdHandler());
        Array.prototype.push.apply(args, ctrl);
        router[ method ].apply(router, args);

        AppLogger.info(
            sprintf('        [%-5s %-30s     ---->   %-s', method.toUpperCase() + ']', url, route)
        )
    }

    AppLogger.info('    [Routes] Routes loaded successfully.')

    return router.routes()
}

export default loadRoutes
