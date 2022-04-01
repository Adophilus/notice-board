<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Notice</th>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Content</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Posted</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
        </tr>
      </thead>
      <tbody>
        <NoticeListItemComponent
          v-for="notice in notices"
          v-bind:key="notice._id"
          :_id="notice._id"
          :_rev="notice._rev"
          v-model:title="notice.title"
          v-model:content="notice.content"
          v-model:status="notice.status"
          v-model:posted="notice.posted"
          @edit-notice="(e) => $emit('edit-notice', e)" />
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NoticeListItemComponent from "@/components/NoticeListItemComponent"
import Notice from "@/models/Notice"

export default {
  name: "NoticeListComponent",
  components: { NoticeListItemComponent },
  emits: [ "edit-notice" ],
  data () {
    return {
      notices: []
    }
  },
  methods: {
    async loadNotice (noticeId) {
      // this.notices.push({
      //   title: "Notice 1",
      //   content: "This is the first notice",
      //   status: "posted",
      //   created: new Date(),
      //   posted: new Date()
      // })
      if (!noticeId) {
        if (this.notices.length < 20) {
          const notices = await Notice.get(this.$root.db, { limit: 20 })
          // console.log(notices)
          for (let notice of notices.rows) {
            this.notices.push(notice.doc)
          }
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
    }
  },
  async mounted () {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (change.deleted) {
        this.notices.find((notice, index) => {
          if (notice._id === change.id) {
            this.notices.pop(index)
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
