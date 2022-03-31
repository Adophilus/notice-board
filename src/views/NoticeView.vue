<template>
  <DashboardBaseComponent :pageTitle="pageTitle">    
    <NoticeEditorComponent v-show="showEditor" />
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <div class="me-auto">
                <h6 class="text-white text-capitalize ps-3">Notice List</h6>
              </div>
              <div class="pe-3">
                <button type="button" class="btn btn-outline-white text-uppercase" @click="showEditor = !showEditor">
                  {{ showEditor ? "Hide" : "Create" }}
                </button>
              </div>
            </div>
          </div>
          <NoticeListComponent />
        </div>
      </div>
    </div>
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from "@/components/DashboardBaseComponent"
import NoticeEditorComponent from "@/components/NoticeEditorComponent"
import NoticeListComponent from "@/components/NoticeListComponent"

export default {
  name: "NoticeView",
  components: {
    DashboardBaseComponent,
    NoticeEditorComponent,
    NoticeListComponent
  },
  data () {
    return {
      pageTitle: "Notices",
      showEditor: false
    }
  }
}
</script>
