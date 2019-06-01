/**
 * Created by devollove9 on 2017/10/26.
 */
import crypto from 'crypto'

export default {
    encrypt: (val) => {
        let secretSalt = ENV.SALT
        let cipher = crypto.createCipher('aes-256-ctr', secretSalt)
        let data = cipher.update(String(val), 'utf8', 'hex')
        return data + cipher.final('hex')
    },
    decrypt: (val) => {
        let secretSalt = ENV.SALT
        let decipher = crypto.createDecipher('aes-256-ctr', secretSalt)
        let data = decipher.update(val, 'hex', 'utf8')
        return data + decipher.final('utf8')
    }
}
