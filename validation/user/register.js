/**
 * Created by devollove9 on 2017/9/19.
 */
let Joi = load( 'libs/dataParse/joiValidate' );
module.exports =
    Joi.object().keys({
        username:Joi.usernameRegister(),
        password:Joi.string().hex().length(32).required()
    });