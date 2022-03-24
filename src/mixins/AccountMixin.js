export default {
  methods: {
    loginUser (registrationNumber, password) {
      const user = $root.model.User.get(registrationNumber)
      if (user.hasPassword(passowrd)) {
        // TODO: login user
      }
    },
    createStudent (firstName, lastName, password) {
      const user = $root.model.User({ firstName: firstName, lastName: lastName, password: password})
      // TODO: create student
    }
  }
}
