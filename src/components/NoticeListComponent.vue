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
        <NoticeListItemComponent v-for="notice in notices" v-model:title="notice.title" v-model:content="notice.content" v-model:status="notice.status" v-model:created="notice.created" v-model:posted="notice.posted" />
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NoticeListItemComponent from "@/components/NoticeListItemComponent"

export default {
  name: "NoticeListComponent",
  components: { NoticeListItemComponent },
  data () {
    return {
      notices: []
    }
  },
  methods: {
    async loadNotices () {
      this.notices.push({
        title: "Notice 1",
        content: "This is the first notice",
        status: "posted",
        created: new Date(),
        posted: new Date()
      })
    }
  },
  async mounted () {
    await this.loadNotices()
  }
}
</script>
