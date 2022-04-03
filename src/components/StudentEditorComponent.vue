<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Create Student</h6>
            </div>
          </div>
        </div>
        <form class="card-body px-0 pb-2" @submit.prevent="saveStudent()">
          <div class="p-4">
            <div class="row">
              <div class="col-md-6">
                <div class="input-group input-group-dynamic mb-4">
                  <label class="form-label">First Name</label>
                  <input type="text" required class="form-control" v-model="firstName">
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-dynamic mb-4">
                  <label class="form-label">Last Name</label>
                  <input type="text" required class="form-control" v-model="lastName">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="input-group input-group-dynamic mb-4">
                  <label class="form-label">Date of Birth</label>
                  <input type="text" required class="form-control" v-model="birthDay">
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-dynamic mb-4">
                  <label class="form-label">Email</label>
                  <input type="email" required class="form-control" v-model="email">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="input-group input-group-dynamic mb-4">
                  <label class="form-label">Faculty</label>
                  <input type="text" required class="form-control" v-model="faculty">
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-dynamic mb-4">
                  <label class="form-label">Department</label>
                  <input type="text" required class="form-control" v-model="department">
                </div>
              </div>
            </div>
            <div class="row">
              <button class="btn btn-icon btn-3 btn-primary" type="submit">
                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                &nbsp;
                <span class="btn-inner--text">Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Student from "@/models/Student.js"

export default {
  name: "StudentEditorComponent",
  emits: [ "hide-editor" ],
  props: [ "_id", '_rev', 'firstName', 'lastName', 'birthDay', 'faculty', 'department', 'email' ],
  methods: {
    async saveStudent () {
      if (this._id) {
        let student = await Student.get(this.$root.db, { id: this._id.split(":")[1] }, false)

        if (student) {
          student.set({
            firstName: this.firstName,
            lastName: this.lastName,
            birthDay: this.birthDay,
            faculty: this.faculty,
            department: this.department,
            email: this.email
          })
        }
        await student.save()
      }
      else {
        const student = new Student(this.$root.db, {
          firstName: this.firstName,
          lastName: this.lastName,
          birthDay: this.birthDay,
          faculty: this.faculty,
          department: this.department,
          email: this.email,
        })
        await student.save()
      }
      
      this.$emit("hide-editor")
    }
  }
}
</script>
