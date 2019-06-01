/**
 * Created by devollove9 on 2017/11/1.
 */

const loadPrototypes = async (ctx) => {
    AppLogger.info('    [Prototypes] Loading prototypes...')
    String.prototype.capitalize = function capitalize () {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
    String.prototype.dotToCamel = function dotToCamel () {
        let arr = this.split('.')
        let result = arr[0]
        for (let i = 1; i < arr.length; i++) {
            result += arr[i].capitalize()
        }
        return result
    }
    String.prototype.padding = function padding (del, length, left) {
        left = left || true
        if (left) {
            return (del.repeat(length) + this).slice(-length)
        } else {
            return (this + del.repeat(length)).slice(0, length)
        }
    }
    AppLogger.info('    [Prototypes] Prototypes loaded...')
}

export default loadPrototypes
