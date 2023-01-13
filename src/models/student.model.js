import db from '@/config/db'
import schema from '@/schema/student.schema'

export default db.Model('Student', db.Schema(schema.schema, schema.options))
