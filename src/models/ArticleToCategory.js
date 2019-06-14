import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    articleCategoryId: String,
    articleId: String
  },
  {
    collection: 'ArticleToCategory'
  }
)
export default schema
