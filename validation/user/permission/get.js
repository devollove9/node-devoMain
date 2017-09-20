/**
 * Created by devollove9 on 2017/9/19.
 */
let Joi = load( 'libs/dataParse/joiValidate' );
module.exports =
    Joi.object().keys(
        {
            userId:Joi.id(),
            permissionId:Joi.id()
        }
    ).or( 'userId' , 'permissionId' );