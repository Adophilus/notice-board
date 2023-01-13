<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Notice
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              Content
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Status
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Posted
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <NoticeListItemComponent
            v-for="notice in notices"
            v-bind:key="notice._id"
            v-model:_id="notice._id"
            v-model:_rev="notice._rev"
            v-model:title="notice.title"
            v-model:content="notice.content"
            v-model:status="notice.status"
            v-model:posted="notice.posted"
            @edit-notice="(e) => $emit('edit-notice', e)"
            @post-notice="postNotice"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NoticeListItemComponent from '@/components/NoticeListItemComponent.vue'
import Notice from '@/models/Notice'
import Admin from '@/models/Admin'
import Student from '@/models/Student'

export default {
  name: 'NoticeListComponent',
  components: { NoticeListItemComponent },
  emits: ['edit-notice'],
  data() {
    return {
      notices: []
    }
  },
  methods: {
    async loadNotice(noticeId) {
      if (!noticeId) {
        if (this.notices.length < 20) {
          ;(await Notice.get(this.$root.db, { limit: 20 }))
            .filter((notice) => {
              if (Student.is(this.$store.getters.user._id)) {
                return notice.creator === this.$store.getters.user._id
              }

              return true
            })
            .forEach((notice) => this.notices.push(notice))
        }
      } else {
        let updatedNotice = await Notice.get(this.$root.db, { id: noticeId })
        if (
          Admin.is(this.$store.getters.user._id) ||
          updatedNotice.creator === this.$store.getters.user._id
        ) {
          let oldNotice = this.notices.find(
            (notice) => Notice.split(notice._id) === noticeId
          )

          if (oldNotice) {
            oldNotice.title = updatedNotice.title
            oldNotice.content = updatedNotice.content
            oldNotice.posted = updatedNotice.posted
            oldNotice.status = updatedNotice.status
            oldNotice._rev = updatedNotice._rev
          } else {
            this.notices.push(updatedNotice)
          }
        }
      }
    },
    async postNotice({ _id }) {
      let notice = new Notice(
        this.$root.db,
        this.notices.find((notice) => notice._id === _id)
      )
      if (notice) {
        await notice.post()
      }
    }
  },
  async mounted() {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (Notice.is(change.id)) {
        if (change.deleted) {
          this.notices.find((notice, index) => {
            if (notice && notice._id === change.id) {
              this.notices.splice(index, 1)
            }
          })
        } else {
          await this.loadNotice(Notice.split(change.id))
        }
      }
    })

    await this.loadNotice()
  }
}
</script>
