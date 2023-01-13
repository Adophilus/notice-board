<template>
  <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center text-truncate">
          <h6 class="mb-0 text-sm">{{ firstName + ' ' + lastName }}</h6>
        </div>
      </div>
    </td>
    <td class="align-middle text-center text-sm">
      <span
        class="text-secondary text-xs font-weight-bold text-truncate"
        style="max-width: 30ch"
        >{{ faculty }}</span
      >
    </td>
    <td class="align-middle text-center text-sm">
      <span class="text-secondary text-xs font-weight-bold">{{
        department
      }}</span>
    </td>
    <td class="align-middle text-center">
      <i
        class="material-icons"
        @click="
          $emit('edit-student', {
            _id,
            _rev,
            firstName,
            lastName,
            birthDay,
            faculty,
            department,
            email
          })
        "
        role="button"
      >
        edit
      </i>
      <i class="material-icons" @click="deleteStudent()" role="button">close</i>
    </td>
  </tr>
</template>

<script>
import Student from '@/models/student.js.model'

export default {
  name: 'StudentListItemComponent',
  emits: ['edit-student'],
  props: {
    _id: {
      type: String
    },
    _rev: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    birthDay: {
      type: String
    },
    faculty: {
      type: String
    },
    department: {
      type: String
    },
    email: {
      type: String
    }
  },
  methods: {
    deleteStudent() {
      if (confirm('Are you sure?')) {
        Student.remove(this.$root.db, { _id: this._id, _rev: this._rev })
      }
    }
  }
}
</script>
