import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    articleId: String,
    userId: String,
    publishDate: Number,
    viewCount: Number,
    uniqueViewCount: Number,
    title: String,
    authorName: String,
    rating: Number,
    contentId: String,
  },
  {
    collection: 'Article'
  }
)
export default schema
