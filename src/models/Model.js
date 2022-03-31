import { SaveFailError } from "@/models/Exceptions.js"

class Model {
  async generateId () {
    return Date.now()
  }

  async remove () {
    return this.db.remove(await this.get(this.id))
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
