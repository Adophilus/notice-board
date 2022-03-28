import { SaveFailError } from "@/models/Exceptions.js"

export default (db) => {
  let User = function ({ username, password }) {
    this.name = "User"
    this.type = "user"
    this.isNew = true
    this.fields = {
      username,
      password
    }

    this.get = (id) => {
      const fields = [ "_id", "username" ]
      if (id) {
        return db.find({
          selector: { _id: `user:${this.type}:${id}` },
          fields:  fields
        })
      }

      return db.find({
        selector: { _id: { $regex: `user:${this.type}` } },
        fields:  fields
      })
    }

    this.encryptPassword = async (password) => {
      return password
    }

    this.hasPassword  = async (password) => {
      return (await this.encryptPassword(password) === password)
    }

    this.remove = async () => {
      return db.remove(this.fields)
    }

    this.save = async () => {
      if (this.isNew) {
        this.fields._id = `user:${this.type}`
        this.password = await this.encryptPassword(this.password)
      }

      let returnValue = db.put(this.fields)
      if (returnValue) {
        this.isNew = false
        return this
      }

      throw SaveFailError(this.name)
    }
  }

  return User
}
