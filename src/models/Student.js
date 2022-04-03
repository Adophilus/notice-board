import User from "@/models/User.js"

class Student extends User {
  static idBase = "user:student:"
  static name = "Student"

  constructor (db, { _id, _rev, firstName, lastName, birthDay, faculty, department, email, password }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      firstName,
      lastName,
      birthDay,
      faculty,
      department,
      email,
      password,
      registrationNumber: 0
    }
  }

  generateRegistrationNumber () {
    return this.generateId()
  }

  static get (db, options, raw = true, fields = [ "_id", "_rev", "firstName", "lastName", "birthDay", "faculty", "department", "email", "password" ]) {
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
