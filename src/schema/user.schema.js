import db from '@/config/db'

export default {
  schema: {
    username: db.Schema.Types.String,
    email: db.Schema.Types.String,
    password: db.Schema.Types.String,
    notices: [db.Schema.Types.String]
  },
  options: {
    methods: {
      hasPassword(password) {
        return false
      }
    }
  }
}
