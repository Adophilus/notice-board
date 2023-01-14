import db from '@/config/db'
import SHA256 from 'crypto-js/sha256'

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
      hashPassword(password) {
        return SHA256(password).toString()
      }
    },
    methods: {
      hasPassword(password) {
        return this.password === this.hashPassword(password)
      }
    }
  }
}
