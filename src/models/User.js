export default (db) => {
  let generateRegistrationNumber = async () => {}
  
  return async function (firstName, lastName) {
    let registrationNumber = await generateRegistrationNumber()
    this.name = "User"
    this.type = "user"
    this.fields = {
      _id: `user:${this.type}:${registrationNumber}`,
      firstName,
      lastName,
      registrationNumber: registrationNumber
    }

    this.get = (id) => {
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

    this.remove = () => {
      return db.remove(this.fields)
    }

    this.save = () => {
      return db.put(this.fields)
    }
  }
}
