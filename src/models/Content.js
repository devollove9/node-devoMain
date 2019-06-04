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
export default schema
