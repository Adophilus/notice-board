<template>
  <DashboardBaseComponent :pageTitle="pageTitle">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
            >
              <div class="me-auto">
                <h6 class="text-white text-capitalize ps-3">Create Student</h6>
              </div>
            </div>
          </div>
          <form class="card-body px-0 pb-2" onsubmit="return false;">
            <div class="p-4">
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>First Name</label>
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      :value="student.fields.firstName"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Last Name</label>
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      :value="student.fields.lastName"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Date of Birth</label>
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      :value="student.fields.birthDay"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Registration No.</label>
                    <input
                      type="email"
                      disabled
                      class="form-control"
                      :value="student.fields.registrationNumber"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Faculty</label>
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      :value="faculty"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Department</label>
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      :value="student.fields.department"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="student.fields.email"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-static mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <button
                  class="btn btn-icon btn-3 btn-primary"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-default"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  &nbsp;
                  <span class="btn-inner--text">Update</span>
                </button>
              </div>
            </div>
          </form>
          <ModalComponent
            header="Update Changes?"
            content="Are you sure you want to save?"
            accepted-button="Save changes"
            type="warning"
            @accepted="updateStudent()"
          />
        </div>
      </div>
    </div>
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from '@/components/DashboardBaseComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import Department from '@/models/department.model'
import Student from '@/models/student.model'

export default {
  name: 'StudentProfileView',
  components: { DashboardBaseComponent, ModalComponent },
  data() {
    return {
      pageTitle: 'Profile',
      faculty: '',
      password: '',
      student: new Student(this.$root.db, {})
    }
  },
  methods: {
    async updateStudent() {
      if (this.password) {
        await this.student.updatePassword(this.password)
      }

      if ((await this.student.save()).ok) {
        alert('Details Updated!')
      }
    }
  },
  async mounted() {
    if (this.$store.getters.isAdmin) {
      this.$router.push({ name: 'LoginView' })
      return
    }

    this.student = await Student.get(
      this.$root.db,
      { id: Student.split(this.$store.getters.user._id) },
      false
    )
    let departments = await Department.get(this.$root.db, {
      where: { code: this.student.fields.department }
    })
    if (departments) {
      this.faculty = departments[0].faculty
    }
  }
}
</script>
