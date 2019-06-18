import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    contentId: String,
    userId: String,
    placeDate: Number,
    articleId: String,
    content: String
  },
  {
    collection: 'Content'
  }
)
schema.index({content: 'text'})
export default schema
