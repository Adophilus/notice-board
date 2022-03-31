import Model from "@/models/Model.js"

class Notice extends Model {
  type = "unverified"
  isNew = true
  name = "Notice"
  
  constructor (db, { title, content, creator, faculty }) {
    super()
    this.db = db
    this.fields = {
      _id: `notice:${this.type}`,
      title,
      content,
      creator,
      faculty,
      created: new Date(),
      posted: null,
      status: this.type
    }
  }

  static get (db, { id, limit }) {
    const fields = [ "_id", "title", "content", "faculty", "creator", "created", "posted", "status" ]

    // get notice by id
    if (id) {
      return db.find({
        selector: { _id: `notice:${this.type}:${id}` },
        fields: fields
      })
    }

    if (limit) {
      return db.allDocs({
        include_docs: true,
        limit: limit
      })
    }
    // get all notices
    return db.find({
      selector: { _id: { $regex: `notice:${this.type}` } },
      fields:  fields
    })
  }

  post () {
    this.fields.posted = new Date()
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
