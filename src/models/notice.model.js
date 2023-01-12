import db from '@/config/db'

const schema = db.Schema({
  title: String,
  content: String,
  creator: String,
  scope: 'global',
  status: ['posted', 'unverified'],
  created: {
    type: Date,
    default: () => Date.now()
  }
})

const model = db.Model('Notice', schema)
export default model
