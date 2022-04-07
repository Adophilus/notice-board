import User from "@/models/User.js"

class Student extends User {
  static idBase = "user:student:"
  static name = "Student"

  constructor (db, { _id, _rev, firstName, lastName, birthDay, department, email, password, notices }) {
    super(db, { _id, _rev, password, notices })
    this.fields = {
      ...this.fields,
      firstName,
      lastName,
      birthDay,
      department,
      email,
      registrationNumber: 0
    }
  }

  generateRegistrationNumber () {
    return this.generateId()
  }

  static get (db, options, raw = true, fields = [ "_id", "_rev", "firstName", "lastName", "birthDay", "department", "email", "password", "notices" ]) {
    return super.get(db, options, raw, fields)
  }

  async save () {
    if (this.isNew) {
      this.fields.registrationNumber = await this.generateRegistrationNumber()
      // TODO: uncomment this line 
      // this.fields.password = this.fields.registrationNumber
      this.fields.password = "password"
    }

    return super.save()
  }
}

export default Student
