import Faculty from "@/models/Faculty.js"

class Department extends Faculty {
  static idBase = "department:"
  static name = "Department"
  
  constructor (db, { _id, _rev, name, faculty, code }) {
    super(db, { _id, _rev, name, code })
    this.fields = {
      ...this.fields,
      faculty
    }
  }

  static async get (db, options, raw = true, fields = [ "_id", "_rev", "name", "faculty", "code" ]) {
    return super.get(db, options, raw, fields)
  }
}

export default Department
