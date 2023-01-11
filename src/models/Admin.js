import db from '@/config/db'
import User from '@/models/User'

const schema = db.Schema({
  ...User
})

const model = db.Model('Admin', schema)

export default model
