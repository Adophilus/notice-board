<template>
  <DashboardBaseComponent :pageTitle="pageTitle">
    <DepartmentEditorComponent
      :_id="editor._id"
      :name="editor.name"
      :faculty="editor.faculty"
      :code="editor.code"
      @hide-editor="showEditor = !showEditor"
      v-show="showEditor"
    />
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
            >
              <div class="me-auto">
                <h6 class="text-white text-capitalize ps-3">Department List</h6>
              </div>
              <div class="pe-3">
                <button
                  type="button"
                  class="btn btn-outline-white text-uppercase"
                  @click="showEditor = !showEditor"
                >
                  {{ showEditor ? 'Hide' : 'Create' }}
                </button>
              </div>
            </div>
          </div>
          <DepartmentListComponent @edit-department="editDepartment" />
        </div>
      </div>
    </div>
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from '@/components/DashboardBaseComponent.vue'
import DepartmentEditorComponent from '@/components/DepartmentEditorComponent.vue'
import DepartmentListComponent from '@/components/DepartmentListComponent.vue'

export default {
  name: 'AdminDepartmentView',
  components: {
    DashboardBaseComponent,
    DepartmentEditorComponent,
    DepartmentListComponent
  },
  data() {
    return {
      pageTitle: 'Departments',
      showEditor: false,
      editor: {
        _id: null,
        name: '',
        department: ''
      }
    }
  },
  methods: {
    editDepartment({ _id, name, faculty, code }) {
      this.editor._id = _id
      this.editor.name = name
      this.editor.faculty = faculty
      this.editor.code = code

      this.showEditor = true
    }
  },
  mounted() {
    if (!this.$store.getters.isAdmin) {
      this.$router.push({ name: 'LoginView' })
    }
  }
}
</script>
