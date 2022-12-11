<template>
  <router-view />
</template>

<script>
import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
import Admin from '@/models/Admin'

PouchDB.plugin(PouchdbFind)

export default {
  name: 'App',
  data() {
    return {
      db: null,
      project: {
        creator: 'Valentine',
        yearCreated: 2022,
        title: 'Notice Board'
      },
      dbWatchers: []
    }
  },
  methods: {
    async checkInstallation() {
      if ((await Admin.get(this.$root.db)).length > 0) {
        const admin = new Admin(this.$root.db, {
          username: 'admin',
          password: 'admin@mail.com',
          email: 'admin@mail.com'
        })
        await admin.save()
      }
    }
  },
  created() {
    document.title = this.project.title
  },
  async mounted() {
    // this.db = new PouchDB("notice-board")
    // await this.db.destroy()
    this.db = new PouchDB('notice-board')
    this.db
      .changes({
        live: true,
        since: 'now'
        // include_docs: true
      })
      .on('change', (change) => {
        this.dbWatchers.forEach((method) => method(change))
      })

    await this.checkInstallation()
  }
}
</script>
