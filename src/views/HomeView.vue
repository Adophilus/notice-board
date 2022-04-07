<template>
	This is the Home view
	<p>
		Navigate to
  </p>
  <div>
    <router-link :to="{ name: 'LoginView' }">Login</router-link>
    <br />
    <router-link v-if="$root.isAdmin" :to="{ name: 'AdminDashboardView' }">Dashboard</router-link>
    <router-link v-else :to="{ name: 'StudentDashboardView' }">Dashboard</router-link>
  </div>
</template>

<script>
export default {
	name: "HomeView"
}
</script>