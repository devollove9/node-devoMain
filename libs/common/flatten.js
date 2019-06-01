/**
 * Created by devo on 11/1/2017.
 */

const flatten = (obj) => {
    let toReturn = {}
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue

        if (obj[i].constructor == Object) {
            let flatObject = flatten(obj[i])
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue
                toReturn[i + '.' + x] = flatObject[x]
            }
        } else {
            toReturn[i] = ob[i]
        }
    }
    return toReturn
}

export default flatten

