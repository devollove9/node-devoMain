/**
 * Created by devollove9 on 2017/10/29.
 */
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        paymentPlanId: String,
        name: String,
        price: Number,
        pricePlan: {
            price: Number,
            duration: String
        },
        displayName: String,
        description: [
            {
                content: String,
                available: Boolean
            }
        ],
        permission: [
            {
                role: String,
                action: [String],
                restrict: [String],
                parameter: [
                    {
                        key: String,
                        value: String
                    }
                ]
            }
        ]
    },
    {
        collection: 'PaymentPlan'
    }
)
export default schema
