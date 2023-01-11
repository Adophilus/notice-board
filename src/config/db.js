import mongoose from 'mongoose'

const db = mongoose.connect(import.meta.env.VITE_DB_URL)

export default db
