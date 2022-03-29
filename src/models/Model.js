import { SaveFailError } from "@/models/Exceptions.js"

class Model {
  async generateId () {
    return Date.now()
  }

  async remove () {
    return this.db.remove(await this.get(this.id))
  }

  async save () {
    let returnValue = this.db.put(this.fields)
    if (returnValue) {
      return this
    }

    throw SaveFailError(this.name)
  }
}

export default Model
