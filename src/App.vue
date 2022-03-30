<template>
  <router-view/>
</template>

<script>
import PouchDB from "pouchdb"
import AccountMixin from "@/mixins/AccountMixin.js"

export default {
  name: "App",
  mixins: [ AccountMixin ],
  data () {
    return {
      db: null,
      project: {
        creator: "Valentine",
        yearCreated: 2022,
        title: "Notice Board"
      }
    }
  },
  async mounted () {
    this.db = new PouchDB("notice-board")
    await this.db.destroy()
    this.db = new PouchDB("notice-board")
  }
}
</script>