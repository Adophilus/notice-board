<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div
            class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
          >
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Create Notice</h6>
            </div>
          </div>
        </div>
        <form class="card-body px-0 pb-2" @submit.prevent="postNotice()">
          <div class="p-4">
            <div class="input-group input-group-static mb-4">
              <label>Title</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="localTitle"
              />
            </div>
            <div class="input-group input-group-static mb-4">
              <label>Content</label>
              <input
                type="text"
                required
                class="form-control"
                v-model="localContent"
              />
            </div>
            <button class="btn btn-icon btn-3 btn-primary" type="submit">
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              &nbsp;
              <span v-if="$store.getters.isAdmin" class="btn-inner--text"
                >Post</span
              >
              <span v-else class="btn-inner--text">Create</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notice from '@/models/notice.js.model'
import Admin from '@/models/admin.js.model'

export default {
  name: 'NoticeEditorComponent',
  emits: ['hide-editor'],
  props: ['_id', 'title', 'content'],
  data() {
    return {
      localTitle: this.title,
      localContent: this.content
    }
  },
  methods: {
    async postNotice() {
      if (this._id) {
        let notice = await Notice.get(
          this.$root.db,
          { id: Notice.split(this._id) },
          false
        )
        if (notice) {
          notice.set({
            title: this.localTitle,
            content: this.localContent
          })
          await notice.post()
        }
      } else {
        const notice = new Notice(this.$root.db, {
          title: this.localTitle,
          content: this.localContent,
          creator: this.$store.getters.user._id,
          scope: null
        })
        if (Admin.is(this.$store.getters.user._id)) {
          await notice.post()
        } else {
          await notice.save()
        }
        // console.log(notice)
      }

      // this.title = ""
      // this.content = ""

      this.$emit('hide-editor')
    }
  }
}
</script>
