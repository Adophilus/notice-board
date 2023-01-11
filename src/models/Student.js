import db from '@/config/db'
import User from '@/models/User'

const schema = db.Schema({
  ...User,
  firstName: String,
  lastName: String,
  birthDay: Date,
  department: String,
  registrationNumber: Number
})

schema.statics.generateRegistrationNumber = () => {
  return Date.now()
}

const model = db.Model('Student', schema)
export default model
