<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
    <div class="sidenav-header">
    <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
    <router-link class="navbar-brand m-0" :to="{ name: 'AdminDashboardView' }" target="_blank">
      <img src="/assets/material-dashboard/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo">
      <span class="ms-1 font-weight-bold text-white">{{ $root.project.title }}</span>
    </router-link>
    </div>
    <hr class="horizontal light mt-0 mb-2">
    <div class="collapse navbar-collapse w-auto h-auto ps" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li v-if="!$store.getters.isAdmin" class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white" :to="{ name: 'StudentProfileView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">person</i>
            </div>
            <span class="nav-link-text ms-1">Profile</span>
          </router-link>
        </li>
        <li v-if="$store.getters.isAdmin" class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white" :to="{ name: 'AdminDashboardView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </router-link>
        </li>
        <li v-else class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white" :to="{ name: 'StudentDashboardView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </router-link>
        </li>
        <li v-if="$store.getters.isAdmin" class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white " :to="{ name: 'AdminStudentView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">people</i>
            </div>
            <span class="nav-link-text ms-1">Students</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white " :to="{ name: 'NoticeView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">error_outline</i>
            </div>
            <span class="nav-link-text ms-1">Notices</span>
          </router-link>
        </li>
        <li v-if="$store.getters.isAdmin" class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white " :to="{ name: 'AdminFacultyView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">school</i>
            </div>
            <span class="nav-link-text ms-1">Faculty</span>
          </router-link>
        </li>
        <li v-if="$store.getters.isAdmin" class="nav-item">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white " :to="{ name: 'AdminDepartmentView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">business</i>
            </div>
            <span class="nav-link-text ms-1">Department</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0 ">
      <ul class="navbar-nav">
        <li class="nav-item mb-2">
          <router-link active-class="active bg-gradient-primary" class="nav-link text-white" @click="$store.commit('unsetUser')" :to="{ name: 'LoginView' }">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="material-icons opacity-10">logout</i>
            </div>
            <span class="nav-link-text ms-1">Sign out</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent"
}
</script>
