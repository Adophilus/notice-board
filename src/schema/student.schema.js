import db from '@/config/db'
import UserSchema from '@/schema/user.schema'
import { deepMerge } from '@/utils/helpers'

export default deepMerge(UserSchema, {
  schema: {
    firstName: db.Schema.Types.String,
    lastName: db.Schema.Types.String,
    birthDay: db.Schema.Types.Date,
    department: db.Schema.Types.String,
    registrationNumber: db.Schema.Types.Number
  },
  options: {
    statics: {
      generateRegistrationNumber() {
        return Date.now()
      }
    }
  }
})
