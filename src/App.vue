<template>
  <router-view/>
</template>

<script>
import PouchDB from "pouchdb"
import PouchdbFind from "pouchdb-find"
import Admin from "@/models/Admin"
import Student from "@/models/Student"

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
    async checkInstallation () {
      if (!((await Admin.get(this.$root.db)).length)) {
        new Admin(this.$root.db, { username: "admin", password: "admin", email: "admin@mail.com" }).save()
      }
    },
    async checkLogin () {
      if (!localStorage.user) {
        this.$router.push({ name: "LoginView" })
      }
      else {
        await this.setUser()
      }
    },
    async setUser () {
      let user
      if (Admin.is(this.$store.getters.user._id)) {
        user = await Admin.get(this.$root.db, { id: Admin.split(this.$store.getters.user._id) })
      }
      else {
        user = await Student.get(this.$root.db, { id: Student.split(this.$store.getters.user._id) })
      }

      this.$store.commit("setUser", user)
    }
  },
  created () {
    document.title = "Notice Board"
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

    await this.checkInstallation()
    await this.checkLogin()
  }
}
</script>