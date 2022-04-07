<template>
  <DashboardBaseComponent :pageTitle="pageTitle">    
    <StudentEditorComponent
      :_id="editor._id"
      :_rev="editor._rev"
      :firstName="editor.firstName"
      :lastName="editor.lastName"
      :birthDay="editor.birthDay"
      :department="editor.department"
      :email="editor.email"
      @hide-editor="showEditor = !showEditor"
      v-show="showEditor" />
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex align-items-start bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <div class="me-auto">
                <h6 class="text-white text-capitalize ps-3">Students List</h6>
              </div>
              <div class="pe-3">
                <button type="button" class="btn btn-outline-white text-uppercase" @click="showEditor = !showEditor">
                  {{ showEditor ? "Hide" : "Create" }}
                </button>
              </div>
            </div>
          </div>
          <StudentListComponent @edit-student="editStudent" />
        </div>
      </div>
    </div>
  </DashboardBaseComponent>
</template>

<script>
import DashboardBaseComponent from "@/components/DashboardBaseComponent"
import StudentEditorComponent from "@/components/StudentEditorComponent"
import StudentListComponent from "@/components/StudentListComponent"

export default {
  name: "AdminStudentView",
  components: {
    DashboardBaseComponent,
    StudentEditorComponent,
    StudentListComponent
  },
  data () {
    return {
      pageTitle: "Students",
      showEditor: false,
      editor: {
        _id: null,
        _rev: null,
        firstName: "",
        lastName: "",
        birthDay: "",
        department: "",
        email: ""
      }
    }
  },
  methods: {
    editStudent ({ _id, _rev, firstName, lastName, birthDay, department, email }) {
      this.editor._id = _id
      this.editor._rev = _rev
      this.editor.firstName = firstName
      this.editor.lastName = lastName
      this.editor.birthDay = birthDay
      this.editor.department = department
      this.editor.email = email

      this.showEditor = true
    }
  }
}
</script>
