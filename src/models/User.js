/**
 * Created by devo on 10/25/2017.
 */
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        userId: String,
        username: String,
        password: String,
        registerDate: Number,
        lastLoginDate: Number,
        activated: Boolean,
        disabled: Boolean,
        codeDisabled: Number,
        reasonDisabled: String,
        account: {
            credit: Number,
            balance: Number
        },
        notification: {
            arn: String,
            platform: String
        },
        activeAddressId: String,
        activePaymentId: String
    },
    {
        collection: 'User'
    }
)
schema.index({userId: 1}, {username: 1}, {registerDate: 1}, {lastLoginDate: 1})
export default schema
