<template>
  <DashboardBaseComponent :pageTitle="pageTitle">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute"
            >
              <i class="material-icons opacity-10">school</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Faculties</p>
              <h4 class="mb-0">{{ numberFaculties }}</h4>
            </div>
          </div>
          <div class="card-footer p-3"></div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute"
            >
              <i class="material-icons opacity-10">business</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Departments</p>
              <h4 class="mb-0">{{ numberDepartments }}</h4>
            </div>
          </div>
          <div class="card-footer p-3"></div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute"
            >
              <i class="material-icons opacity-10">people</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Students</p>
              <h4 class="mb-0">{{ numberStudents }}</h4>
            </div>
          </div>
          <div class="card-footer p-3"></div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute"
            >
              <i class="material-icons opacity-10">error_outline</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Notices</p>
              <h4 class="mb-0">{{ numberNotices }}</h4>
            </div>
          </div>
          <div class="card-footer p-3"></div>
        </div>
      </div>
    </div>
    <NoticeBoardComponent />
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from '@/components/DashboardBaseComponent.vue'
import NoticeBoardComponent from '@/components/NoticeBoardComponent.vue'
import Student from '@/models/student.model'
import Notice from '@/models/notice.model'
import Faculty from '@/models/faculty.model'
import Department from '@/models/department.model'

export default {
  name: 'AdminDashboardView',
  components: { DashboardBaseComponent, NoticeBoardComponent },
  data() {
    return {
      numberNotices: 0,
      numberStudents: 0,
      numberFaculties: 0,
      numberDepartments: 0,
      pageTitle: 'Dashboard'
    }
  },
  methods: {
    Notice,
    Student
  },
  async mounted() {
    if (!this.$store.getters.isAdmin) {
      this.$router.push({ name: 'LoginView' })
    }

    this.numberNotices = await Notice.count(this.$root.db)
    this.numberStudents = await Student.count(this.$root.db)
    this.numberFaculties = await Faculty.count(this.$root.db)
    this.numberDepartments = await Department.count(this.$root.db)
  }
}
</script>
