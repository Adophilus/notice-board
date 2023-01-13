import db from '@/config/db'

export default {
  schema: {
    name: db.Schema.Types.String,
    code: db.Schema.Types.String
  }
}
