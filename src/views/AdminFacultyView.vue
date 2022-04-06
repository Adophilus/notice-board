<template>
  <DashboardBaseComponent :pageTitle="pageTitle">    
    <FacultyEditorComponent
      :_id="editor._id"
      :title="editor.name"
      @hide-editor="showEditor = !showEditor"
      v-show="showEditor" />
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <div class="me-auto">
                <h6 class="text-white text-capitalize ps-3">Faculty List</h6>
              </div>
              <div class="pe-3">
                <button type="button" class="btn btn-outline-white text-uppercase" @click="showEditor = !showEditor">
                  {{ showEditor ? "Hide" : "Create" }}
                </button>
              </div>
            </div>
          </div>
          <FacultyListComponent @edit-faculty="editFaculty" />
        </div>
      </div>
    </div>
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from "@/components/DashboardBaseComponent"
import FacultyEditorComponent from "@/components/FacultyEditorComponent"
import FacultyListComponent from "@/components/FacultyListComponent"

export default {
  name: "AdminFacultyView",
  components: {
    DashboardBaseComponent,
    FacultyEditorComponent,
    FacultyListComponent
  },
  data () {
    return {
      pageTitle: "Faculty",
      showEditor: false,
      editor: {
        _id: null,
        name: ""
      }
    }
  },
  methods: {
    editFaculty ({ _id, name }) {
      this.editor._id = _id
      this.editor.name = name

      this.showEditor = true
    }
  }
}
</script>
