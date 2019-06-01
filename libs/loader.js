/**
 * Created by devo on 4/21/2016.
 */
const loader = (url) => {
    try {
        return require(url)
    } catch(e) {
        if (e.code == 'MODULE_NOT_FOUND') {
            return require(process.env.PWD+'/'+url)
        }
        throw e
    }
}

export default loader;