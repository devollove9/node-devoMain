/**
 * Created by devo on 9/6/2016.
 * Get module name based on directory tabs and should it be capital
 */
import * as fs from 'fs'

const getModuleName = (dir, tabCount, cap) => {
    let p = ''
    let tab = ''
    for (let i = 0; i < tabCount; i++) {
        tab += '    '
    }
    if (cap === undefined) cap = 'd'
    if (cap === 'c' || cap === 'd' || cap === 'C' || cap === 'n') {
        if (fs.lstatSync(dir).isDirectory()) {
            let pArray = dir.split('/')
            p = pArray.pop()
        } else if (!fs.lstatSync(dir).isDirectory()) {
            let pArray = dir.split('/')
            p = pArray.pop()
        } else {
            p = dir
        }
    } else {
        p = dir
    }

    if (cap && p) {
        switch (cap) {
        case 'b':
            break
        case 'n':
            break
            // Do fist character capital
        case 'c':
            p = tab + p[0].toUpperCase() + p.slice(1)
            break
            // Do fist character capital with double brackets
        case 'd':
            p = tab + '[' + p[0].toUpperCase() + p.slice(1) + '] '
            break
            // Do all character capital
        case 'C':
            p = tab + p.toUpperCase()
            break
        }
    }
    return p
}

export default getModuleName
