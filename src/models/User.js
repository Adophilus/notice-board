import Model from "@/models/Model.js"
import SHA256 from "crypto-js/sha256"

class User extends Model {
  constructor (db, { username, password }) {
    super()
    this.name = "User"
    this.type = "user"
    this.isNew = true
    this.db = db
    this.fields = {
      _id: `user:${this.type}`,
      username,
      password
    }
  }

  get (id) {
    const fields = [ "_id", "username" ]

    // get user by id
    if (id) {
      return this.db.find({
        selector: { _id: `user:${this.type}:${id}` },
        fields:  fields
      })
    }

    // get all users
    return this.db.find({
      selector: { _id: { $regex: `user:${this.type}` } },
      fields:  fields
    })
  }

  async encryptPassword (password) {
    return SHA256(password).toString()
  }

  async hasPassword (password) {
    return (await this.encryptPassword(password) === this.fields.password)
  }

  async save () {
    if (this.isNew) {
      const id = await this.generateId()
      this.fields._id = `${this.fields._id}:${id}`
      this.fields.password = await this.encryptPassword(this.fields.password)
      this.isNew = false
    }

    return super.save()
  }
}

export default User
