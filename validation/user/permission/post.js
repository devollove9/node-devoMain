/**
 * Created by devollove9 on 2017/9/19.
 */
let Joi = load( 'libs/dataParse/joiValidate' );
module.exports =
    Joi.object().keys({
        userId:Joi.id().required(),
        permission:Joi.array().items( Joi.object().keys({
            role:Joi.string().required(),
            action:Joi.array().items( Joi.string() ).required(),
            restrict:Joi.array().items( Joi.string() ),
            parameter:Joi.object()
        }))
    });