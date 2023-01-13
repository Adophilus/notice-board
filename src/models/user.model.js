import db from '@/config/db'
import schema from '@/schema/user.schema'

export default db.Model('User', db.Schema(schema.schema, schema.options))
