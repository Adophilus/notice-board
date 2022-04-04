<template>
  <div class="row my-4">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <div class="ps-3" v-show="showViewer" @click="showViewer = false">
              <span class="material-icons text-white" role="button">
                arrow_back_ios
              </span>
            </div>
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Notice Board</h6>
            </div>
            <div class="pe-3">
              <button type="button" class="btn btn-outline-white text-uppercase" v-show="false">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div v-if="showViewer" class="card-body px-0 pb-2">
          <div class="px-3">
            <p class="h4">
              {{ viewer.notice.title }}
            </p>
            <p>
              {{ viewer.notice.content }}
            </p>
          </div>
        </div>
        <div v-else class="card-body px-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <tbody>
                <NoticeBoardItemComponent
                  v-for="notice in notices"
                  v-bind:key="notice._id"
                  :_id="notice._id"
                  :title="notice.title"
                  :content="notice.content"
                  :posted="notice.posted"
                  @view-notice="viewNotice" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoticeBoardItemComponent from "@/components/NoticeBoardItemComponent"
import Notice from "@/models/Notice"

export default {
  name: "NoticeBoardComponent",
  components: { NoticeBoardItemComponent },
  data () {
    return {
      showViewer: false,
      viewer: {
        notice: {}
      },
      notices: []
    }
  },
  methods: {
    async loadNotice (noticeId) {
      if (!noticeId) {
        if (this.notices.length < 20) {
          (await Notice.get(this.$root.db, { limit: 20 }))
            .forEach((notice) => this.notices.push(notice))
        }
      }
      else {
        let updatedNotice = await Notice.get(this.$root.db, { id: noticeId })
        let oldNotice = this.notices.find((notice) => notice._id.split(":")[1] === noticeId)

        if (oldNotice) {
          oldNotice.title = updatedNotice.title
          oldNotice.content = updatedNotice.content
          oldNotice.posted = updatedNotice.posted
          oldNotice._rev = updatedNotice._rev
        }
        else {
          this.notices.push(updatedNotice)
        }
      }
    },
    viewNotice ({ _id }) {
      this.showViewer = true
      this.viewer.notice = this.notices.find((notice) => notice._id === _id)
    }
  },
  async mounted () {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (change.deleted) {

        this.notices.find((notice, index) => {

          if (notice && notice._id === change.id) {
            this.notices.splice(index, 1)
          }
        })
      }
      else {
        await this.loadNotice(change.id.split(":")[1])
      }
    })

    await this.loadNotice()
  }
}
</script>
