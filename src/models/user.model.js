import db from '@/config/db'
import schema from '@/schema/user.schema'

export default db.Model('User', schema)
