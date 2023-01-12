import db from '@/config/db'
import schema from '@/schema/student.schema'

export default db.Model('Student', schema)
