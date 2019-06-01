/**
 * Created by devollove9 on 2017/10/27.
 */
import string from 'underscore.string'
import microtime from 'microtime'

export default (machineId, groupId) => {
    machineId = machineId || ENV.MACHINE
    groupId = groupId || ENV.GROUP
    groupId = parseInt(groupId.toString().substr(0, 1)).toString()
    let machine = stringUtil.pad(machineId.toString(16), 4, '0')
    let pid = stringUtil.pad(process.pid.toString(16), 4, '0')
    let i = microtime.now().toString(16)
    return groupId + machine + pid + i
}
