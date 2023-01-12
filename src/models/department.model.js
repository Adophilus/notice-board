import db from '@/config/db'

const schema = db.Schema({
  name: String,
  faculty: String,
  code: String
})

const model = db.Model('Department', schema)
export default model
