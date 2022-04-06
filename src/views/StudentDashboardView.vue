<template>
  <DashboardBaseComponent :pageTitle="pageTitle">
    <NoticeBoardComponent />
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from "@/components/DashboardBaseComponent"
import NoticeBoardComponent from "@/components/NoticeBoardComponent"

export default {
  name: 'StudentDashboardView',
  components: { DashboardBaseComponent, NoticeBoardComponent },
  data () {
    return {
      pageTitle: "Dashboard"
    }
  }
}
</script>
