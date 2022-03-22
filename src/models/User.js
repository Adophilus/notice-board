export default (db) => {
  return {
    name: "User",
    type: "user",
    constructor (firstName, lastName) {
      const regNumber = await this.generateRegNumber()
      this.fields = {
        _id: `user:${this.type}:${regNumber}`,
        firstName,
        lastName
        regNumber: regNumber
      }
    },
    get (id) {
      const fields = [ "_id", "firstName", "lastName" ]
      
      if (id)
        return db.find({
          selector: { _id: `user:${this.type}:${id}` },
          fields:  fields
        })
      return db.find({
        selector: { _id: { $regex: `user:${this.type}` } },
        fields:  fields
      })
    }
    delete () {
      return db.remove(this.fields)
    },
    save () {
      return db.put(this.fields)
    }
  }
}