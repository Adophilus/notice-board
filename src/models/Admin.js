import User from "@/models/User.js"

class Admin extends User {
  constructor (db, { username, password, email }) {
    super()
    this.name = "User"
    this.type = "admin"
    this.isNew = true
    this.db = db
    this.fields = {
      _id: `user:${this.type}`,
      username,
      password,
      email
    }
  }

  get (id) {
    const fields = [ "_id", "username", "email" ]

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

  async save () {
    if (this.isNew) {
      const id = await this.generateId()
      this.fields._id = `${this.fields._id}:${id}`
      this.password = await this.encryptPassword(this.password)
      this.isNew = false
    }

    return super.save()
  }
}

export default Admin
