import db from '@/config/db'
import schema from '@/schema/notice.schema'

export default db.Model('Notice', schema)
