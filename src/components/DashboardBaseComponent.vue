<template>
  <SidebarComponent />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <NavbarComponent :pageTitle="pageTitle" />
    <div class="container-fluid py-4">
      <slot></slot>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

export default {
  name: 'DashboardBaseComponent',
  components: { FooterComponent, NavbarComponent, SidebarComponent },
  props: {
    pageTitle: {
      type: String
    }
  }
}
</script>
