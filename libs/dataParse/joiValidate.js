/**
 * Created by devollove9 on 2017/10/26.
 */
import joi from 'joi'
import _ from 'underscore'
import util from 'util'

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

joi.stringArray= () => {
  let array=[]
  for (let i=0;i<arguments.length;i++) {
    if (_.isArray(arguments[i])) {
      array=array.concat(arguments[i])
    } else {
      array.push(arguments[i])
    }
  }
  if (array.length === 0) {
    return joi.string().regex(/(\w+)(,\w+)*/gmi)
  }
  const regex=util.format('(%s)(,(%s))*',array.join('|'),array.join('|'))
  return joi.string().regex(new RegExp(regex,'gmi'))
}

joi.base64 = () => {
  return joi.string().regex(/^data:.+\/(.+);base64,(.*)$/)
}

export default joi
