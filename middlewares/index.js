/**
 * Created by devollove9 on 2017/10/26.
 * All middlewares
 * Requested packages:
 *  sprintf
 *  deep-filter
 *  devomain-constants
 *  devomain-libs
 *  deepcopy
 *  underscore
 */
import errorHandler from './errorHandler'
import permissionFilter from './permissionFilter'
import queryValidator from './queryValidator'
import mongoIdHandler from './mongoIdHandler'

const middleware = {
    errorHandler: errorHandler,
    permissionFilter: permissionFilter,
    queryValidator: queryValidator,
    mongoIdHandler: mongoIdHandler
}

export { errorHandler, permissionFilter, queryValidator, mongoIdHandler }
export default middleware
