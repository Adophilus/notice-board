<template>
  <router-view />
</template>

<script>
import config from '@/config'

export default {
  name: 'App',
  created() {
    document.title = config.app.title
  }
}
</script>
