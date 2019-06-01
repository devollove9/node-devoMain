/**
 * Created by devo on 4/26/2016.
 */
import * as fs from 'fs'
import * as path from 'path'

const walkThrough = (dir) => {
  let results = []
  let list = fs.readdirSync(dir)
  let listLength = list.length
  if (!listLength) return results
  for (let file of list) {
    file = path.resolve(dir, file)
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walkThrough(file))
      if (!--listLength) return results
    } else {
      results.push(file)
      if (!--listLength) return results
    }
  }
}

export default walkThrough