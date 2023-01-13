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
      <span
        class="text-secondary text-xs font-weight-bold text-truncate"
        style="max-width: 30ch"
      >
        {{ code }}
      </span>
    </td>
    <td class="align-middle text-center text-sm">
      <span
        class="text-secondary text-xs font-weight-bold text-truncate"
        style="max-width: 30ch"
      >
        {{ faculty }}
      </span>
    </td>
    <td class="align-middle text-center">
      <i
        class="material-icons"
        @click="$emit('edit-department', { _id, _rev, name, faculty, code })"
        role="button"
      >
        edit
      </i>
      <i class="material-icons" @click="deleteDepartment()" role="button"
        >close</i
      >
    </td>
  </tr>
</template>

<script>
import Department from '@/models/department.model'

export default {
  name: 'DepartmentListItemComponent',
  emits: ['edit-department'],
  props: {
    _id: {
      type: String
    },
    _rev: {
      type: String
    },
    name: {
      type: String
    },
    faculty: {
      type: String
    },
    code: {
      type: String
    }
  },
  methods: {
    deleteDepartment() {
      if (confirm('Are you sure?')) {
        Department.remove(this.$root.db, { _id: this._id, _rev: this._rev })
      }
    }
  }
}
</script>
