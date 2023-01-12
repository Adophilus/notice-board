import db from '@/config/db'

const schema = db.Schema({
  name: String,
  code: String
})

const model = db.Model('Faculty', schema)
export default model
