/**
 * Created by devo on 4/22/2016.
 */
const mongoose = load( 'mongoose' );
const schema = new mongoose.Schema(
    {
        userId:String,
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
        activePaymentId:String,
        favoriteItems:[
            {
                itemId:String,
                name:String,
                nameEn:String,
                storeName:String,
                storeNameEn:String
            }
        ],
        favoriteStores:[
            {
                storeId:String,
                name:String,
                nameEn:String
            }
        ]
    },
    {
        collection:'User'
    }
);
module.exports  = schema;