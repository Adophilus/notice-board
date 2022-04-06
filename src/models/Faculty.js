import Model from "@/models/Model.js"

class Faculty extends Model {
  static idBase = "faculty:"
  static name = "Faculty"

  constructor (db, { _id, _rev, name }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      name
    }
  }

  static async get (db, options, raw = true, fields = [ "_id", "_rev", "name" ]) {
    return super.get(db, options, raw, fields)
  }
}

export default Faculty
