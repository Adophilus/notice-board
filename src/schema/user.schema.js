import db from '@/config/db'
import bcrypt from 'bcrypt'

export default {
  schema: {
    username: db.Schema.Types.String,
    email: db.Schema.Types.String,
    password: db.Schema.Types.String,
    notices: {
      type: [db.Schema.Types.String],
      default: []
    }
  },
  options: {
    statics: {
      async hashPassword(password) {
        return bcrypt.hashPassword(password, 10)
      }
    },
    methods: {
      async hasPassword(password) {
        return bcrypt.compare(this.password, password)
      }
    }
  }
}
