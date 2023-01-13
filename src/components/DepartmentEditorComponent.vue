<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div
            class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
          >
            <div class="me-auto">
              <h6 class="text-white text-capitalize ps-3">Create Department</h6>
            </div>
          </div>
        </div>
        <form class="card-body px-0 pb-2" @submit.prevent="saveDepartment()">
          <div class="p-4">
            <div class="row">
              <div class="col-md-9 col-sm-12">
                <div class="input-group input-group-static mb-4">
                  <label>Name</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    v-model="localName"
                  />
                </div>
              </div>
              <div class="col-md-3 col-sm-12">
                <div class="input-group input-group-static mb-4">
                  <label>Code</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    v-model="localCode"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="input-group input-group-static mb-4">
                <label>Faculty</label>
                <select required class="form-control" v-model="localFaculty">
                  <option
                    v-for="_faculty in faculties"
                    v-bind:key="_faculty.code"
                    :value="_faculty.code"
                  >
                    {{ _faculty.name }} ({{ _faculty.code }})
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <button
                class="btn btn-icon btn-3 btn-primary"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#modal-default"
              >
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
import Faculty from '@/models/Faculty'
import Department from '@/models/Department'

export default {
  name: 'DepartmentEditorComponent',
  data() {
    return {
      faculties: [],
      localName: this.name,
      localFaculty: this.faculty,
      localCode: this.code
    }
  },
  emits: ['hide-editor'],
  props: ['_id', '_rev', 'name', 'faculty', 'code'],
  methods: {
    async saveDepartment() {
      let saved

      if (this._id) {
        let department = await Department.get(
          this.$root.db,
          { id: Department.split(this._id) },
          false
        )

        if (department) {
          department.set({
            name: this.localName,
            faculty: this.localFaculty,
            code: this.localCode
          })
          saved = await department.save()
        }
      } else {
        const department = new Department(this.$root.db, {
          name: this.localName,
          faculty: this.localFaculty,
          code: this.localCode
        })
        saved = await department.save()
      }

      if (saved.ok) {
        this.$emit('hide-editor')
        alert('Department saved!')
      } else {
        alert(saved.error)
      }
    }
  },
  async mounted() {
    this.faculties = await Faculty.get(this.$root.db)
  }
}
</script>
