/**
 * Created by devollove9 on 2017/10/27.
 */
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        userId: String,
        permissionId: String,
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
        collection: 'Permission'
    }
)
export default schema
