/**
 * Created by devollove9 on 2017/9/18.
 */
const mongoose = load( 'mongoose' );
const schema = new mongoose.Schema(
    {
        userId:String,
        permissionId:String,
        permission:[
            {
                role:String,
                action:[String],
                restrict:[String],
                parameter:[
                    {
                        key:String,
                        value:String
                    }
                ]
            }
        ]
    },
    {
        collection:'Permission'
    }
);
module.exports  = schema;