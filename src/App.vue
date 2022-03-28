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
        creator: "Valentine",
        yearCreated: 2022,
        title: "Notice Board"
      }
    }
  },
  async mounted () {
    loadScript("assets/core/popper.min.js")
    loadScript("assets/core/bootstrap.min.js")
    loadScript("assets/core/buttons.js")
    loadScript("assets/material-dashboard/js/material-dashboard.min.js")
    loadScript("assets/plugins/perfect-scrollbar.min.js")
    loadScript("assets/plugins/smooth-scrollbar.min.js")
    loadScript("assets/custom/init-scrollbar-plugin.js")
    loadScript("https://kit.fontawesome.com/42d5adcbca.js")

    this.db = new PouchDB("notice-board")
    await this.db.destroy()
    this.db = new PouchDB("notice-board")
    
    this.model = await init(this.db)
    await this.createStudent({
      firstName: "Adophilus",
      lastName: "Brian",
      password: "password"
    })
  }
}
</script>

<style>
@import "/public/assets/material-dashboard/css/material-dashboard.css";
@import "/public/assets/material-dashboard/css/nucleo-icons.css";
@import "/public/assets/material-dashboard/css/nucleo-svg.css";
@import "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>