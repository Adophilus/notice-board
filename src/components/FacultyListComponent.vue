<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Name
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Departments
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <FacultyListItemComponent
          v-for="faculty in facultys"
          v-bind:key="faculty._id"
          :_id="faculty._id"
          :_rev="faculty._rev"
          :name="faculty.name"
          @edit-faculty="(e) => $emit('edit-faculty', e)" />
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FacultyListItemComponent from "@/components/FacultyListItemComponent"
import Faculty from "@/models/Faculty"

export default {
  name: "FacultyListComponent",
  components: { FacultyListItemComponent },
  emits: [ "edit-faculty" ],
  data () {
    return {
      facultys: []
    }
  },
  methods: {
    async loadFaculty (facultyId) {
      if (!facultyId) {
        if (this.facultys.length < 20) {
          (await Faculty.get(this.$root.db, { limit: 20 }))
            .forEach((faculty) => this.facultys.push(faculty))
        }
      }
      else {
        let updatedFaculty = await Faculty.get(this.$root.db, { id: facultyId })
        let oldFaculty = this.facultys.find((faculty) => faculty._id.split(":")[2] === facultyId)

        if (oldFaculty) {
          oldFaculty.name = updatedFaculty.name
          oldFaculty._rev = updatedFaculty._rev
        }
        else {
          this.facultys.push(updatedFaculty)
        }
      }
    }
  },
  async mounted () {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (change.deleted) {

        this.facultys.find((faculty, index) => {

          if (faculty && faculty._id === change.id) {
            this.facultys.splice(index, 1)
          }
        })
      }
      else {
        await this.loadFaculty(change.id.split(":")[2])
      }
    })

    await this.loadFaculty()
  }
}
</script>
