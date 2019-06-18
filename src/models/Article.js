import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    articleId: String,
    userId: String,
    publishDate: Number,
    updateDate: Number,
    viewCount: Number,
    uniqueViewCount: Number,
    title: String,
    authorName: String,
    rating: Number,
    contentId: String
  },
  {
    collection: 'Article'
  }
)
schema.index({name: 'text', title: 'text', authorName: 'text'})
export default schema
