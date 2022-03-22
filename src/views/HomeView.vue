<template>
	This is the Home view
	<p>
		Navigate to
  </p>
  <div>
    <router-link to="login">Login</router-link>
    <br />
    <router-link to="dashboard">Dashboard</router-link>
  </div>
</template>

<script>
export default {
	name: "HomeView"
}
</script>