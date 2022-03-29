import User from "@/models/User.js"

export default {
  methods: {
    async loginUser (registrationNumber, password) {
      // const user = new this.$root.model.User.get(registrationNumber)
      const user = new User.get(registrationNumber)
      if (user && user.hasPassword(password)) {
        // TODO: login user
      }
    },
    async createStudent (studentDetails) {
      // const user = new this.$root.model.User(studentDetails)
      const user = new User(this.$root.db, studentDetails)
      const saved = await user.save()
      if (saved) {
        // TODO: create student
        console.log(await user.hasPassword("password"))
      }
    }
  }
}
