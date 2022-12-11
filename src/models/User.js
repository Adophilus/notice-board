import Model from "@/models/Model.js"
// import SHA256 from "crypto-js/sha256"

class User extends Model {
  static idBase = "user:"
  static name = "User"
  static unique = ["username"]

  constructor(db, { _id, _rev, username, password, notices }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      username,
      password,
      notices: notices ? notices : []
    }
  }

  __setProps() {
    super.__setProps()
    this.fields.role = this.role
  }

  static get(db, options, raw = true, fields = ["_id", "_rev", "username", "password", "notices"]) {
    return super.get(db, options, raw, fields)
  }

  static async encryptPassword(password) {
    // return SHA256(password).toString()
    return password
  }

  async hasPassword(password) {
    return (await this.constructor.encryptPassword(password) === this.fields.password)
  }

  async updatePassword(password) {
    this.fields.password = await this.constructor.encryptPassword(password)
    return this.save()
  }

  addReadNotice(noticeId) {
    if (!this.hasReadNotice()) {
      this.fields.notices.push(noticeId)

      return this.save()
    }
  }

  hasReadNotice(noticeId) {
    return !!(this.fields.notices.find((_noticeId) => _noticeId === noticeId))
  }

  async save() {
    if (this.isNew) {
      this.fields.password = await this.constructor.encryptPassword(this.fields.password)
    }

    return super.save()
  }
}

export default User
