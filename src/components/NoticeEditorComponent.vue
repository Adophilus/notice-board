<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Create Notice</h6>
            </div>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="p-4">
            <div class="input-group input-group-dynamic mb-4">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" v-model="notice.title">
            </div>
            <div class="input-group input-group-static mb-4">
              <label>Content</label>
              <input type="text" class="form-control" v-model="notice.content">
            </div>
            <button class="btn btn-icon btn-3 btn-primary" type="button" @click="postNotice()">
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              &nbsp;
              <span class="btn-inner--text">Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notice from "@/models/Notice.js"

export default {
  name: "NoticeEditorComponent",
  data () {
    return {
      notice: {
        title: "",
        content: ""
      }
    }
  },
  methods: {
    async postNotice () {
      const notice = new Notice(this.$root.db, {
        title: this.notice.title,
        content: this.notice.content,
        creator: null,
        faculty: null
      })
      console.log(await notice.post())
      
      this.notice.title = ""
      this.notice.content = ""
    }
  }
}
</script>
