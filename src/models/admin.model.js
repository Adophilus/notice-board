import db from '@/config/db'
import schema from '@/schema/admin.schema'

export default db.Model('Admin', db.Schema(schema.schema, schema.options))
