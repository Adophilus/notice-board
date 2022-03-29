import User from "@/models/User.js"

class Student extends User {
  constructor (db, { firstName, lastName, birthDay, faculty, department, email, password }) {
    super()
    this.name = "User"
    this.type = "student"
    this.isNew = true
    this.db = db
    this.fields = {
      _id: `user:${this.type}`,
      firstName,
      lastName,
      birthDay,
      faculty,
      department,
      email,
      password
    }
  }

  generateRegistrationNumber () {
    return this.generateId()
  }

  get (id) {
    const fields = [ "_id", "firstName", "lastName", "birthDay", "faculty", "department", "email" ]

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
      const registrationNumber = await generateRegistrationNumber()
      this.fields._id = `${this.fields._id}:${registrationNumber}`
      this.password = await this.encryptPassword(this.password)
      this.isNew = false
    }

    return super.save()
  }
}

export default Student
