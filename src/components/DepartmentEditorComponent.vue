<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Create Department</h6>
            </div>
          </div>
        </div>
        <form class="card-body px-0 pb-2" @submit.prevent="saveDepartment()">
          <div class="p-4">
            <div class="row">
              <div class="input-group input-group-dynamic mb-4">
                <label class="form-label">Name</label>
                <input type="text" required class="form-control" v-model="name">
              </div>
            </div>
            <div class="row">
              <div class="input-group input-group-dynamic mb-4">
                <label class="form-label">Faculty</label>
                <input type="text" required class="form-control" v-model="faculty">
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
import Department from "@/models/Department.js"

export default {
  name: "DepartmentEditorComponent",
  emits: [ "hide-editor" ],
  props: [ "_id", '_rev', 'name', 'faculty' ],
  methods: {
    async saveDepartment () {
      if (this._id) {
        let department = await Department.get(this.$root.db, { id: Department.split(this._id) }, false)

        if (department) {
          department.set({
            name: this.name,
            faculty: this.faculty
          })
          await department.save()
        }
      }
      else {
        const department = new Department(this.$root.db, {
          name: this.name,
          faculty: this.faculty
        })
        await department.save()
      }
      
      this.$emit("hide-editor")
    }
  }
}
</script>
