import Model from "@/models/Model.js"

class Faculty extends Model {
  static idBase = "faculty:"
  static name = "Faculty"
  static unique = [ "name", "code" ]

  constructor (db, { _id, _rev, name, code }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      name,
      code
    }
  }

  static async get (db, options, raw = true, fields = [ "_id", "_rev", "name", "code" ]) {
    return super.get(db, options, raw, fields)
  }
}

export default Faculty
