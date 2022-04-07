import Model from "@/models/Model.js"
import SHA256 from "crypto-js/sha256"

class User extends Model {
  static idBase = "user:"
  static name = "User"

  constructor (db, { _id, _rev, username, password, notices }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      username,
      password,
      notices: notices ? notices : []
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

  addReadNotice (noticeId) {
    if (!this.fields.notices.find((_noticeId) => _noticeId === noticeId)) {
      this.fields.notices.push(noticeId)

      return this.save()
    }
  }
  
  async save () {
    if (this.isNew) {
      this.fields.password = await this.constructor.encryptPassword(this.fields.password)
    }

    return super.save()
  }
}

export default User