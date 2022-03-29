import Model from "@/models/Model.js"

class Notice extends Model {
  constructor (db, { title, message, timestamp, faculty }) {
    super()
    this.name = "Notice"
    this.type = "unverified"
    this.isNew = true
    this.db = db
    this.fields = {
      _id: `notice:${this.type}`,
      title,
      message,
      timestamp,
      faculty
    }
  }

  get (id) {
    const fields = [ "_id", "username" ]

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

  async save () {
    const id = await this.generateId()

    if (this.isNew) {
      this.fields._id = `${this.fields._id}:${id}`
    }

    return super.save()
  }
}

export default Notice
