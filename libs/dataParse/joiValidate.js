/**
 * Created by devollove9 on 2017/9/17.
 */
var joi = load( 'joi' );

joi.id = function Id() {
    return joi.string().hex().length( 22 );
};
joi.username = function Username(){
    return [
        joi.string().email().allow( '' ).required(),
        joi.string().regex( /[0-9]{10}$/ ).allow( '' ).required()
    ];
};
joi.usernameRegister = function Username(){
    return [
        joi.string().email().required(),
        joi.string().regex( /[0-9]{10}$/ ).required()
    ];
};

module.exports=joi;