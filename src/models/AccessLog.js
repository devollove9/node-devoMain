import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    userId: String,
    accessId: String,
    placeDate: Number,
    requestMethod: String,
    status: Number,
    actionType: String,
    ipReal: String,
    ipForward: String,
    platform: String,
    host: String,
    origin: String,
    referer: String,
  },
  {
    collection: 'AccessLog'
  }
)
schema.index({ userId: 1 }, { ipReal: 1 }, { ipForward: 1 }, { placeDate: 1} )
export default schema
