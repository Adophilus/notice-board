<template>
  <DashboardBaseComponent :pageTitle="pageTitle">
    <NoticeBoardComponent />
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from '@/components/DashboardBaseComponent.vue'
import NoticeBoardComponent from '@/components/NoticeBoardComponent.vue'

export default {
  name: 'StudentDashboardView',
  components: { DashboardBaseComponent, NoticeBoardComponent },
  data() {
    return {
      pageTitle: 'Dashboard'
    }
  },
  mounted() {
    if (this.$store.getters.isAdmin) {
      this.$router.push({ name: 'LoginView' })
    }
  }
}
</script>
