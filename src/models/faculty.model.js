import db from '@/config/db'
import schema from '@/schema/faculty.schema'

export default db.Model('Faculty', db.Schema(schema.schema, schema.options))
