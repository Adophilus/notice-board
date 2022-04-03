import Model from "@/models/Model.js"
import SHA256 from "crypto-js/sha256"

class User extends Model {
  static idBase = "user:"
  static name = "User"

  constructor (db, { _id, _rev, username, password }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      username,
      password
    }
  }

  __setProps () {
    super.__setProps()
    this.fields.role = this.role
  }

  static get (db, options, raw = true, fields = [ "_id", "_rev", "username", "password" ]) {
    return super.get(db, options, raw, fields)
  }

  static async encryptPassword (password) {
    return SHA256(password).toString()
  }

  async hasPassword (password) {
    return (await this.constructor.encryptPassword(password) === this.fields.password)
  }

  async save () {
    if (this.isNew) {
      this.fields.password = await this.constructor.encryptPassword(this.fields.password)
    }

    return super.save()
  }
}

export default User