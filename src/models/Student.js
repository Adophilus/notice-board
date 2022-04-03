import User from "@/models/User.js"

class Student extends User {
  static name = "Student"
  isNew = true

  constructor (db, { _id, _rev, firstName, lastName, birthDay, faculty, department, email, password }) {
    super(db, { _id, _rev })
    this.fields = {
      firstName,
      lastName,
      birthDay,
      faculty,
      department,
      email,
      password,
      registrationNumber: null
    }
  }

  generateRegistrationNumber () {
    return this.generateId()
  }

  get (db, options, raw = true, fields = [ "_id", "firstName", "lastName", "birthDay", "faculty", "department", "email" ]) {
    return super.get(db, options, raw, fields)
  }

  async save () {
    if (this.isNew) {
      this.fields.registrationNumber = await this.generateRegistrationNumber()
      this.fields.password = this.fields.registrationNumber
    }

    return super.save()
  }
}

export default Student
