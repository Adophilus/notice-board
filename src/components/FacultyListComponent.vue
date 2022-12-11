<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Name
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Code
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Departments
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <FacultyListItemComponent
            v-for="faculty in faculties"
            v-bind:key="faculty._id"
            :_id="faculty._id"
            :_rev="faculty._rev"
            :name="faculty.name"
            :code="faculty.code"
            :departments="faculty.departments"
            @edit-faculty="(e) => $emit('edit-faculty', e)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FacultyListItemComponent from '@/components/FacultyListItemComponent.vue'
import Faculty from '@/models/Faculty'
import Department from '@/models/Department'

export default {
  name: 'FacultyListComponent',
  components: { FacultyListItemComponent },
  emits: ['edit-faculty'],
  data() {
    return {
      faculties: []
    }
  },
  methods: {
    async loadFaculty(facultyId) {
      if (!facultyId) {
        if (this.faculties.length < 20) {
          (await Faculty.get(this.$root.db, { limit: 20 })).forEach(
            async (faculty) => {
              faculty.departments = (
                await Department.get(this.$root.db, {
                  where: { faculty: faculty.code }
                })
              ).length
              this.faculties.push(faculty)
            }
          )
        }
      } else {
        let updatedFaculty = await Faculty.get(this.$root.db, { id: facultyId })
        let oldFaculty = this.faculties.find(
          (faculty) => Faculty.split(faculty._id) === facultyId
        )

        if (oldFaculty) {
          oldFaculty.name = updatedFaculty.name
          oldFaculty.code = updatedFaculty.code
          oldFaculty._rev = updatedFaculty._rev
        } else {
          this.faculties.push(updatedFaculty)
        }
      }
    }
  },
  async mounted() {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (Faculty.is(change.id)) {
        if (change.deleted) {
          this.faculties.find((faculty, index) => {
            if (faculty && faculty._id === change.id) {
              this.faculties.splice(index, 1)
            }
          })
        } else {
          await this.loadFaculty(Faculty.split(change.id))
        }
      }
    })

    await this.loadFaculty()
  }
}
</script>
