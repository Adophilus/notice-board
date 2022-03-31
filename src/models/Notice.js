import Model from "@/models/Model.js"

class Notice extends Model {
  constructor (db, { title, content, creator, faculty }) {
    super()
    this.name = "Notice"
    this.type = "unverified"
    this.isNew = true
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

  get (id) {
    const fields = [ "_id", "title", "content", "faculty", "creator", "created", "posted", "status" ]

    // get notice by id
    if (id) {
      return this.db.find({
        selector: { _id: `notice:${this.type}:${id}` },
        fields:  fields
      })
    }

    // get all notices
    return this.db.find({
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
