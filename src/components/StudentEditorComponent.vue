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
                <div class="input-group input-group-static mb-4">
                  <label>First Name</label>
                  <input type="text" required class="form-control" v-model="localFirstName">
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-static mb-4">
                  <label>Last Name</label>
                  <input type="text" required class="form-control" v-model="localLastName">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="input-group input-group-static mb-4">
                  <label>Date of Birth</label>
                  <input type="text" required class="form-control" v-model="localBirthDay">
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-static mb-4">
                  <label>Email</label>
                  <input type="email" required class="form-control" v-model="localEmail">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="input-group input-group-static mb-4">
                  <label>Faculty</label>
                  <select @click="getDepartments()" required class="form-control" v-model="localFaculty">
                    <option v-for="_faculty in faculties" v-bind:key="_faculty.code" :value="_faculty.code">{{ _faculty.name }} ({{ _faculty.code }})</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-static mb-4">
                  <label>Department</label>
                  <select required class="form-control" v-model="localDepartment">
                    <option v-for="_department in departments" v-bind:key="_department.code" :value="_department.code">{{ _department.name }} ({{ _department.code }})</option>
                  </select>
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
import Faculty from "@/models/Faculty.js"
import Department from "@/models/Department.js"

export default {
  name: "StudentEditorComponent",
  emits: [ "hide-editor" ],
  props: [ "_id", '_rev', 'firstName', 'lastName', 'birthDay', 'department', 'email' ],
  data () {
    return {
      faculty: "",
      faculties: [],
      departments: [],
      localFirstName: this.firstName, 
      localLastName: this.lastName, 
      localBirthDay: this.birthDay, 
      localEmail: this.email, 
      localFaculty: this.faculty, 
      localDepartment: this.department
    }
  },
  methods: {
    async getDepartments () {
      this.departments = await Department.get(this.$root.db, { where: { faculty: this.localFaculty }})
    },
    async saveStudent () {
      let saved
      let student

      if (this._id) {
        student = await Student.get(this.$root.db, { id: Student.split(this._id) }, false)
        if (student) {
          student.set({
            firstName: this.localFirstName,
            lastName: this.localLastName,
            birthDay: this.localBirthDay,
            department: this.localDepartment,
            email: this.localEmail
          })
          saved = await student.save()
        }
      }
      else {
        student = new Student(this.$root.db, {
          firstName: this.localFirstName,
          lastName: this.localLastName,
          birthDay: this.localBirthDay,
          department: this.localDepartment,
          email: this.localEmail
        })
        saved = await student.save()
      }
      
      if (saved.ok) {
        this.$emit("hide-editor")
        alert(`Student saved!`)
      }
      else {
        alert(saved.error)
      }
    }
  },
  async mounted () {
    this.faculties = await Faculty.get(this.$root.db)
  }
}
</script>
