import User from "@/models/User.js"

class Admin extends User {
  static name = "Admin"
  isNew = true

  constructor (db, { _id, _rev, username, password, email }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      username,
      password,
      email
    }
  }

  static get (db, options, raw = true) {
    const fields = [ "_id", "_rev", "username", "password", "email" ]

    return super.get(db, options, raw, fields)
  }

  async save () {
    if (this.isNew) {
      this.fields.password = await this.constructor.encryptPassword(this.fields.password)
    }

    return super.save()
  }
}

export default Admin