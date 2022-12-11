import User from "@/models/User"

class Admin extends User {
  static idBase = "user:admin:"
  static name = "Admin"
  static unique = ["username", "email"]

  constructor(db, { _id, _rev, username, password, email, notices }) {
    super(db, { _id, _rev, username, password, notices })
    this.fields = {
      ...this.fields,
      email
    }
  }

  static get(db, options, raw = true, fields = ["_id", "_rev", "username", "password", "email", "notices"]) {
    return super.get(db, options, raw, fields)
  }
}

export default Admin
