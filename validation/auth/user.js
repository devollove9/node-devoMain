/**
 * Created by devollove9 on 2017/9/17.
 */
let Joi=load('libs/dataParse/joiValidate');
module.exports=
    Joi.object().keys(
        {
            maxAge:Joi.number().integer().min(0),
            username:Joi.string().required(),
            password:Joi.string().required()
        }
    );
