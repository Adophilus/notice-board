<template>
  <router-view/>
</template>

<script>
import PouchDB from "pouchdb"
import PouchdbFind from "pouchdb-find"

PouchDB.plugin(PouchdbFind)

export default {
  name: "App",
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
  methods: {
    checkLogin () {
      if (localStorage.user) {
        if (!this.$store.user) {
          this.$store.commit("setUser", JSON.parse(localStorage.user))
        }
      }
      else {
        this.$router.push({ name: "LoginView" })
      }
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

    this.checkLogin()
  }
}
</script>