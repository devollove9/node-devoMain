/**
 * Created by devollove9 on 2017/10/26.
 */
import joi from 'joi'
joi.id = () => {
    return joi.string().hex().length(22)
}
joi.username = () => {
    return [
        joi.string().email().allow('').required()
        // joi.string().regex( /[0-9]{10}$/ ).allow( '' ).required()
    ]
}
joi.usernameRegister = () => {
    return [
        joi.string().email().required()
        // joi.string().regex( /[0-9]{10}$/ ).required()
    ]
}

export default joi
