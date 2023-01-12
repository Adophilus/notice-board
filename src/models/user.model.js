import db from '@/config/db'

const schema = db.Schema({
  username: String,
  email: String,
  password: String,
  notices: [String]
})

const model = db.Model('User', schema)

export default model
