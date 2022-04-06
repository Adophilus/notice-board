import Model from "@/models/Model.js"

class Notice extends Model {
  static idBase = "notice:"
  static name = "Notice"
  static scope = {
    GLOBAL: "global"
  }

  constructor (db, { _id, _rev, title, content, creator, scope }) {
    super(db, { _id, _rev })
    this.fields = {
      ...this.fields,
      title,
      content,
      creator,
      scope: scope ? scope : this.constructor.scope.GLOBAL,
      created: Date.now(),
      posted: null,
      status: "unverified"
    }
  }

  static async get (db, options, raw = true, fields = [ "_id", "_rev", "title", "content", "scope", "creator", "created", "posted", "status" ]) {
    return super.get(db, options, raw, fields)
  }

  post () {
    this.fields.posted = Date.now()
    this.fields.status = "posted"
    return this.save()
  }
}

export default Notice
