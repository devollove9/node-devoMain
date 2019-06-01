/**
 * Created by devo on 10/25/2017.
 */
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        userId: String,
        userProfileId: String,
        name: String,
        firstName: String,
        lastName: String,
        isPublic: Boolean,
        affiliation: String,
        jobPosition: String,
        jobTitle: String,
        fieldOfStudy: [String],
        education: [
            {
                facility: String,
                duration: String,
                address: String,
                degree: String,
                major: String,
                description: String,
                isLatest: Boolean
            }
        ],
        experience:[
            {
                facility: String,
                duration: String,
                address: String,
                title: String,
                description: String,
                isLatest: Boolean
            }
        ],
        reviews:[]
    },
    {
        collection: 'UserProfile'
    }
)
export default schema
