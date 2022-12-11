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
              Faculty
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <DepartmentListItemComponent
            v-for="department in departments"
            v-bind:key="department._id"
            :_id="department._id"
            :_rev="department._rev"
            :name="department.name"
            :faculty="department.faculty"
            :code="department.code"
            @edit-department="(e) => $emit('edit-department', e)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DepartmentListItemComponent from '@/components/DepartmentListItemComponent.vue'
import Department from '@/models/Department'

export default {
  name: 'DepartmentListComponent',
  components: { DepartmentListItemComponent },
  emits: ['edit-department'],
  data() {
    return {
      departments: []
    }
  },
  methods: {
    async loadDepartment(departmentId) {
      if (!departmentId) {
        if (this.departments.length < 20) {
          ;(await Department.get(this.$root.db, { limit: 20 })).forEach(
            (department) => this.departments.push(department)
          )
        }
      } else {
        let updatedDepartment = await Department.get(this.$root.db, {
          id: departmentId
        })
        let oldDepartment = this.departments.find(
          (department) => Department.split(department._id) === departmentId
        )

        if (oldDepartment) {
          oldDepartment.name = updatedDepartment.name
          oldDepartment.faculty = updatedDepartment.faculty
          oldDepartment.code = updatedDepartment.code
          oldDepartment._rev = updatedDepartment._rev
        } else {
          this.departments.push(updatedDepartment)
        }
      }
    }
  },
  async mounted() {
    this.$root.dbWatchers.push(async (change) => {
      // console.log(change)

      if (Department.is(change.id)) {
        if (change.deleted) {
          this.departments.find((department, index) => {
            if (department && department._id === change.id) {
              this.departments.splice(index, 1)
            }
          })
        } else {
          await this.loadDepartment(Department.split(change.id))
        }
      }
    })

    await this.loadDepartment()
  }
}
</script>
