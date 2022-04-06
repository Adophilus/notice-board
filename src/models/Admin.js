import User from "@/models/User.js"

class Admin extends User {
  static idBase = "user:admin:"
  static name = "Admin"

  constructor (db, { _id, _rev, username, password, email }) {
    super(db, { _id, _rev, username, password })
    this.fields = {
      ...this.fields,
      email
    }
  }

  static get (db, options, raw = true, fields = [ "_id", "_rev", "username", "password", "email" ]) {
    return super.get(db, options, raw, fields)
  }
}

export default Admin
