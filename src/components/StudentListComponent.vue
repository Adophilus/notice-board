<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Full Name</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Faculty</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Department</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
        </tr>
      </thead>
      <tbody>
        <StudentListItemComponent
          v-for="student in students"
          v-bind:key="student._id"
          :_id="student._id"
          :_rev="student._rev"
          :firstName="student.firstName"
          :lastName="student.lastName"
          :birthDay="student.birthDay"
          :faculty="student.faculty"
          :department="student.department"
          :email="student.email"
          @edit-student="(e) => $emit('edit-student', e)" />
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StudentListItemComponent from "@/components/StudentListItemComponent"
import Student from "@/models/Student"
import Department from "@/models/Department"

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
          (await Student.get(this.$root.db, { limit: 20 }))
            .forEach(async (student) => {
              let department = await Department.get(this.$root.db, {
                where: {
                  code: student.department
                }
              })
              student.faculty = department[0].faculty
              this.students.push(student)
            })
        }
      }
      else {
        let updatedStudent = await Student.get(this.$root.db, { id: studentId })
        let oldStudent = this.students.find((student) => student._id.split(":")[2] === studentId)

        if (oldStudent) {
          oldStudent.firstName = updatedStudent.firstName
          oldStudent.lastName = updatedStudent.lastName
          oldStudent.birthDay = updatedStudent.birthDay
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
        await this.loadStudent(change.id.split(":")[2])
      }
    })

    await this.loadStudent()
  }
}
</script>
