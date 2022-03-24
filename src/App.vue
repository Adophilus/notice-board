<template>
  <router-view/>
</template>

<script>
import PouchDB from "pouchdb"
import { loadScript } from "vue-plugin-load-script"
import { init } from "@/models"
import AccountMixin from "@/mixins/AccountMixin.js"

export default {
  name: "App",
  mixins: [ AccountMixin ],
  data () {
    return {
      db: null,
      model: null,
      fullYear: new Date().getFullYear().toString(),
      project: {
        creator: "Valentine"
      }
    }
  },
  async mounted () {
    loadScript("assets/core/popper.min.js")
    loadScript("assets/core/bootstrap.min.js")
    loadScruot("assets/core/buttons.js")
    loadScruot("assets/material-dashboard/js/material-dashboard.min.js")
    loadScript("assets/plugins/perfect-scrollbar.min.js")
    loadScript("assets/plugins/smooth-scrollbar.min.js")
    loadScript("assets/custom/init-scrollbar-plugin.js")

    this.db = new PouchDB("notice-board")
    this.model = await init(this.db)
  }
}
</script>
