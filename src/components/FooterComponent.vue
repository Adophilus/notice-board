<template>
  <footer class="footer py-4">
    <div class="container-fluid">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6 mb-lg-0 mb-4">
      <div class="copyright text-center text-sm text-muted text-lg-start">
        © {{ $root.project.yearCreated }} made with <i class="fa fa-heart"></i> by {{ $root.project.creator }}
      </div>
      </div>
    </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>
