/**
 * Created by devo on 4/22/2016.
 */
const mongoose = load( 'mongoose' );
const schema = new mongoose.Schema(
    {
        userId:String,
        username:String,
        password:String,
        registerDate:Number,
        lastLoginDate:Number,
        account:{
            credit:Number,
            balance:Number
        },
        notification:{
            arn:String,
            platform:String
        },
        activeAddressId:String,
        activePaymentId:String
    },
    {
        collection:'User'
    }
);
module.exports  = schema;