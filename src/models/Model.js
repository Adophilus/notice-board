import { SaveFailError } from "@/models/Exceptions.js"

class Model {
  static idBase = "model:"
  static name = "Model"
  isNew = true

  constructor (db, { _id, _rev }) {
    this.db = db
    this.fields = {
      _id: this.idBase
    }

    if (_id) {
      this.isNew = false
      this.fields._id = _id
      this.fields._rev = _rev
    }
  }

  static async get (db, { id, limit }, raw = true, fields = [ "_id", "_rev" ]) {
    // GET MODEL BY ID

    if (id) {
      let models = await db.find({
        selector: { _id: `${this.idBase}${id}` },
        fields: fields
      })

      if (raw)
        return models.docs[0]

      return models.docs.map((model) => new this.constructor(db, model))[0]
    }
    else if (limit) {
      return db.allDocs({
        include_docs: true,
        limit: limit
      })
    }

    // GET ALL MODELS

    let models = db.find({
      selector: { _id: { $regex: this.idBase } },
      fields: fields
    })

    if (raw)
      return models.docs[0]

    return models.docs.map((model) => new this.constructor(db, model))[0]
  }

  async generateId () {
    return Date.now()
  }

  set (fields) {
    for (let key in fields) {
      this.fields[key] = fields[key]
    }
  }

  static async remove (db, { _id, _rev }) {
    if (_id && _rev){
      return db.remove(_id, _rev)
    }

    return this.db.remove(this.fields._id, this.fields._rev)
  }

  async save () {
    if (this.isNew) {
      this.fields._id = `${this.constructor.idBase}${await this.generateId()}`
    }

    try {
      let returnValue = await this.db.put(this.fields)
      if (returnValue) {
        this.fields._rev = returnValue.rev
        this.isNew = false
        return this
      }
    }
    catch (e) {
      console.log(e)
      throw SaveFailError(this.constructor.name)
    }
  }
}

export default Model
