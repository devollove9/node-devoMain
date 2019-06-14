import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    articleCategoryId: String,
    name: String,
    nameCN: String
  },
  {
    collection: 'ArticleCategory'
  }
)
export default schema
