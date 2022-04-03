<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Full Name</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Birthday</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Faculty</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Department</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
        </tr>
      </thead>
      <tbody>
        <StudentListItemComponent
          v-for="student in students"
          v-bind:key="student._id"
          v-model:_id="student._id"
          v-model:_rev="student._rev"
          v-model:firstName="student.firstName"
          v-model:lastName="student.lastName"
          v-model:birthDay="student.birthDay"
          v-model:faculty="student.faculty"
          v-model:department="student.department"
          v-model:email="student.email"
          @edit-student="(e) => $emit('edit-student', e)" />
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StudentListItemComponent from "@/components/StudentListItemComponent"
import Student from "@/models/Student"

export default {
  name: "StudentListComponent",
  components: { StudentListItemComponent },
  emits: [ "edit-student" ],
  data () {
    return {
      students: []
    }
  },
  methods: {
    async loadStudent (studentId) {
      if (!studentId) {
        if (this.students.length < 20) {
          const students = await Student.get(this.$root.db, { limit: 20 })
          for (let student of students.rows) {
            this.students.push(student.doc)
          }
        }
      }
      else {
        let updatedStudent = await Student.get(this.$root.db, { id: studentId })
        let oldStudent = this.students.find((student) => student._id.split(":")[1] === studentId)

        if (oldStudent) {
          oldStudent.firstName = updatedStudent.firstName
          oldStudent.lastName = updatedStudent.lastName
          oldStudent.birthDay = updatedStudent.birthDay
          oldStudent.faculty = updatedStudent.faculty
          oldStudent.department = updatedStudent.department
          oldStudent.email = updatedStudent.email
          oldStudent._rev = updatedStudent._rev
        }
        else {
          this.students.push(updatedStudent)
        }
      }
    }
  },
  async mounted () {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (change.deleted) {

        this.students.find((student, index) => {

          if (student && student._id === change.id) {
            this.students.splice(index, 1)
          }
        })
      }
      else {
        await this.loadStudent(change.id.split(":")[1])
      }
    })

    await this.loadStudent()
  }
}
</script>
