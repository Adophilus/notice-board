<template>
 <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center text-truncate">
          <h6 class="mb-0 text-sm">
            {{ name }}
          </h6>
        </div>
      </div>
    </td>
    <td class="align-middle text-center text-sm">
      <span class="text-secondary text-xs font-weight-bold text-truncate" style="max-width: 30ch">
        0
      </span>
    </td>
    <td class="align-middle text-center">
      <i class="material-icons"
        @click="$emit('edit-faculty', { _id, _rev, name })"
        role="button">
         edit
        </i>
      <i class="material-icons" @click="Faculty.remove($root.db, { _id, _rev })" role="button">close</i>
    </td>
  </tr>
</template>

<script>
import Faculty from "@/models/Faculty.js"

export default {
  name: "FacultyListItemComponent",
  emits: [ "edit-faculty" ],
  props: {
    _id: {
      type: String
    },
    _rev: {
      type: String
    },
    name: {
      type: String
    }
  },
  methods: {
    Faculty
  }
}
</script>