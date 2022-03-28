export default {
  methods: {
    async loginUser (registrationNumber, password) {
      const user = await this.$root.model.User.get(registrationNumber)
      if (user && user.hasPassword(password)) {
        // TODO: login user
      }
    },
    async createStudent (studentDetails) {
      const user = new this.$root.model.User(studentDetails)
      const saved = await user.save()
      if (saved) {
        // TODO: create student
        console.log(saved)
      }
    }
  }
}
