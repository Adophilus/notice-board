import db from '@/config/db'

export default {
  schema: {
    title: db.Schema.Types.String,
    content: db.Schema.Types.String,
    creator: db.Schema.Types.ObjectId,
    scope: {
      types: db.Schema.Types.String,
      enum: ['global']
    },
    status: {
      types: db.Schema.Types.String,
      enum: ['posted', 'unverified']
    }
  },
  options: { timestamps: true }
}
