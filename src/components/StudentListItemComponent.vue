<template>
 <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center text-truncate">
          <h6 class="mb-0 text-sm">{{ firstName + " " + lastName }}</h6>
        </div>
      </div>
    </td>
    <td>
      <span class="text-secondary text-xs font-weight-bold">{{ birthDay }}</span>
      <p class="text-xs text-secondary mb-0 text-truncate" style="max-width: 30ch">{{ faculty }}</p>
    </td>
    <td class="align-middle text-center text-sm">
      <span class="text-secondary text-xs font-weight-bold">{{ department }}</span>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{ department }}</span>
    </td>
    <td class="d-flex justify-content-center">
      <i class="material-icons"
        @click="$emit('edit-student', { _id, firstName, lastName, birthDay, faculty, department, email })"
        role="button">
         edit
        </i>
      <i class="material-icons" @click="Student.remove($root.db, { _id, _rev })" role="button">close</i>
    </td>
  </tr>
</template>

<script>
import moment from "moment"
import Student from "@/models/Student.js"

export default {
  name: "StudentListItemComponent",
  emits: [ "edit-student" ],
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
    moment,
    Student
  }
}
</script>