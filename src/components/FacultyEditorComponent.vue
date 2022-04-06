<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Create Faculty</h6>
            </div>
          </div>
        </div>
        <form class="card-body px-0 pb-2" @submit.prevent="saveFaculty()">
          <div class="p-4">
            <div class="row">
              <div class="input-group input-group-dynamic mb-4">
                <label class="form-label">Name</label>
                <input type="text" required class="form-control" v-model="name">
              </div>
            </div>
            <div class="row">
              <button class="btn btn-icon btn-3 btn-primary" type="submit">
                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                &nbsp;
                <span class="btn-inner--text">Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Faculty from "@/models/Faculty.js"

export default {
  name: "FacultyEditorComponent",
  emits: [ "hide-editor" ],
  props: [ "_id", '_rev', 'name' ],
  methods: {
    async saveFaculty () {
      if (this._id) {
        let faculty = await Faculty.get(this.$root.db, { id: Faculty.split(this._id) }, false)

        if (faculty) {
          faculty.set({
            name: this.name
          })
          await faculty.save()
        }
      }
      else {
        const faculty = new Faculty(this.$root.db, {
          name: this.name
        })
        await faculty.save()
      }
      
      this.$emit("hide-editor")
    }
  }
}
</script>
