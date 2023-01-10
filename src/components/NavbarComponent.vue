<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
    navbar-scroll="true">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
          <li class="breadcrumb-item text-sm text-dark active" aria-current="page">{{ pageTitle }}</li>
        </ol>
        <h6 class="font-weight-bolder mb-0">{{ pageTitle }}</h6>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item px-3 d-flex align-items-center">
            <span class="d-sm-inline d-none">
              Welcome {{ $store.getters.user != null ? $store.getters.isAdmin ? $store.getters.user.username :
                  $store.getters.user.firstName : ''
              }}
            </span>
          </li>
          <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <router-link :to="{ name: 'NoticeView' }" class="nav-link text-body p-0" aria-expanded="false">
              <i class="fa fa-bell cursor-pointer" aria-hidden="true"></i>
            </router-link>
          </li>
          <li class="nav-item ps-3 d-flex d-xl-none align-items-center">
            <a href="javascript:;" class="nav-link text-body p-0" onclick="javascript:toggleSidenav()"
              id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  props: {
    pageTitle: {
      type: String
    }
  }
}
</script>
