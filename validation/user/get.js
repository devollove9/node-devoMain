/**
 * Created by devollove9 on 2017/9/18.
 */
let Joi = load( 'libs/dataParse/joiValidate' );
module.exports =
    Joi.object().keys( 
        {
            userId:Joi.id(),
            username:Joi.username()
        }
    );