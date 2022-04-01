import { SaveFailError } from "@/models/Exceptions.js"

class Model {
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

    return this.db.remove(this._id, this._rev)
  }

  async save () {
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
      throw SaveFailError(this.name)
    }
  }
}

export default Model
