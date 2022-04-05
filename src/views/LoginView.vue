<template>
  <main class="main-content  mt-0">
    <div class="page-header align-items-start min-vh-100">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="alert alert-danger alert-dismissible fade show mb-5" role="alert" v-show="loginError">
              <span class="alert-icon align-middle">
                <span class="material-icons text-md">
                warning
                </span>
              </span>
              <span>
                Invalid Registration number or password!
              </span>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent="loginUser()">
                  <div class="input-group input-group-outline my-3">
                    <label class="form-label">Registration Number</label>
                    <input type="text" required class="form-control" v-model="registrationNumber">
                  </div>
                  <div class="input-group input-group-outline mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" required class="form-control" v-model="password">
                  </div>
                  <div class="form-check form-switch d-flex align-items-center mb-3">
                    <input class="form-check-input" type="checkbox" id="rememberMe">
                    <label class="form-check-label mb-0 ms-2" for="rememberMe">Remember me</label>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  </main>
</template>

<style scoped>
body {
  background-image: url('../../public/assets/img/login-bg.jpg');
}
</style>

<script>
import FooterComponent from "@/components/FooterComponent"
import Admin from "@/models/Admin"
import Student from "@/models/Student"

export default {
  name: "LoginView",
  components: { FooterComponent },
  data () {
    return {
      loginError: false,
      registrationNumber: "",
      password: ""
    }
  },
  methods: {
    async loginUser () {
      let admin = await Admin.get(this.$root.db, { where: { email: this.registrationNumber } }, false)
      admin = admin[0]
      let student = await Student.get(this.$root.db, { id: this.registrationNumber }, false)
      
      if (admin && await admin.hasPassword(this.password)) {
        this.$store.commit("setUser", admin.fields)
        this.$router.push({ name: "AdminDashboardView" })
      }
      else if (student && await student.hasPassword(this.password)) {
        this.$store.commit("setUser", student.fields)
        this.$router.push({ name: "AdminDashboardView" })
      }
      else {
        this.loginError = true
      }
    }
  }
}
</script>
