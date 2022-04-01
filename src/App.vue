<template>
  <router-view/>
</template>

<script>
import PouchDB from "pouchdb"
import PouchdbFind from "pouchdb-find"
import AccountMixin from "@/mixins/AccountMixin.js"

PouchDB.plugin(PouchdbFind)

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
      },
      dbWatchers: []
    }
  },
  async mounted () {
    // this.db = new PouchDB("notice-board")
    // await this.db.destroy()
    this.db = new PouchDB("notice-board")
    this.db.changes({
      live: true,
      since: "now"
      // include_docs: true
    }).on("change", (change) => {
      this.dbWatchers.forEach((method) => method(change))
    })
  }
}
</script>