/**
 * Created by devollove9 on 2017/9/18.
 */
var crypto = load( 'crypto' );
module.exports = {
    encrypt:function( val ) {
        let secretSalt = "BDjHwV9EGyMIVSOGJtAm48CYOASZQl12";
        var cipher = crypto.createCipher( 'aes-256-ctr' , secretSalt );
        var data = cipher.update( String( val ) , 'utf8' , 'hex' );
        return data + cipher.final( 'hex' );
    },
    decrypt:function( val ) {
        let secretSalt = "BDjHwV9EGyMIVSOGJtAm48CYOASZQl12";
        var decipher = crypto.createDecipher( 'aes-256-ctr' , secretSalt );
        var data = decipher.update( val , 'hex' , 'utf8' );
        return data + decipher.final( 'utf8' );
    }
}