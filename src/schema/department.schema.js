import db from '@/config/db'

export default {
  schema: {
    name: db.Schema.Types.String,
    faculty: {
      type: db.Schema.Types.ObjectId,
      ref: 'faculty'
    },
    code: db.Schema.Types.String
  }
}
