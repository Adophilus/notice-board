import db from '@/config/db'
import schema from '@/schema/department.schema'

export default db.Model('Department', db.Schema(schema.schema, schema.options))
