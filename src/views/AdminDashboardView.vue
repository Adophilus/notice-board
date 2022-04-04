<template>
  <DashboardBaseComponent :pageTitle="pageTitle">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
              <i class="material-icons opacity-10">person</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Students</p>
              <h4 class="mb-0">{{ numberStudents }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="card">
          <div class="card-header p-3 pt-2">
            <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
              <i class="material-icons opacity-10">receipt_long</i>
            </div>
            <div class="text-end pt-1">
              <p class="text-sm mb-0 text-capitalize">Notices</p>
              <h4 class="mb-0">{{ numberNotices }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoticeBoardComponent />
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from "@/components/DashboardBaseComponent"
import NoticeBoardComponent from "@/components/NoticeBoardComponent"
import Student from "@/models/Student"
import Notice from "@/models/Notice"

export default {
  name: 'AdminDashboardView',
  components: { DashboardBaseComponent, NoticeBoardComponent },
  data () {
    return {
      numberNotices: 0,
      numberStudents: 0,
      pageTitle: "Dashboard"
    }
  },
  methods: {
    Notice,
    Student
  },
  async mounted () {
    this.numberNotices = await Notice.count(this.$root.db)
    this.numberStudents = await Student.count(this.$root.db)
  }
}
</script>
