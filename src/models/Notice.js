import Model from "@/models/Model.js"

class Notice extends Model {
  isNew = true
  name = "Notice"
  
  constructor (db, { _id, _rev, title, content, creator, faculty }) {
    super()
    this.db = db
    this.fields = {
      _id: `notice`,
      title,
      content,
      creator,
      faculty,
      created: Date.now(),
      posted: null,
      status: "unverified"
    }

    if (_id) {
      this.isNew = false
      this.fields._id = _id
      this.fields._rev = _rev
    }
  }

  static async get (db, { id, limit }, raw = true) {
    const fields = [ "_id", "_rev", "title", "content", "faculty", "creator", "created", "posted", "status" ]

    // GET NOTICE BY ID

    if (id) {
      let notices = await db.find({
        selector: { _id: `notice:${id}` },
        fields: fields
      })

      if (raw)
        return notices.docs[0]

      return notices.docs.map((notice) => new Notice(db, notice))[0]
    }
    else if (limit) {
      return db.allDocs({
        include_docs: true,
        limit: limit
      })
    }

    // GET ALL NOTICES

    let notices = db.find({
      selector: { _id: { $regex: `notice:` } },
      fields:  fields
    })

    if (raw)
      return notices.docs[0]

    return notices.docs.map((notice) => new Notice(notice))[0]
  }

  post () {
    this.fields.posted = Date.now()
    this.fields.status = "posted"
    return this.save()
  }

  async save () {
    const id = await this.generateId()

    if (this.isNew) {
      this.fields._id = `${this.fields._id}:${id}`
    }

    return super.save()
  }
}

export default Notice
