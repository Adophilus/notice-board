import User from "@/models/User.js"

export default {
  methods: {
    async loginUser (registrationNumber, password) {
      // const user = new this.$root.model.User.get(registrationNumber)
      const user = new User.get(registrationNumber)
      if (user && user.hasPassword(password)) {
        // TODO: login user
      }
    }
  }
}
