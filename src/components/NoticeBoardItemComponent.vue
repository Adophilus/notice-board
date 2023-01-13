<template>
  <tr @click="$emit('view-notice', { _id })" style="cursor: pointer">
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column text-truncate">
          <h6 class="mb-0 text-sm">{{ title }}</h6>
        </div>
      </div>
    </td>
    <td>
      <p
        class="text-xs text-secondary mb-0 text-truncate"
        style="max-width: 30ch"
      >
        {{ content }}
      </p>
    </td>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center">
          <span v-if="hasRead" class="badge badge-sm bg-gradient-primary"
            >read</span
          >
          <span v-else class="badge badge-sm bg-gradient-secondary"
            >unread</span
          >
        </div>
      </div>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{
        moment(posted).format('DD/MM/YYYY')
      }}</span>
    </td>
  </tr>
</template>

<script>
import moment from 'moment'

export default {
  name: 'NoticeListItemComponent',
  emits: ['view-notice'],
  props: {
    _id: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    posted: {
      type: Number
    },
    hasRead: {
      type: Boolean
    }
  },
  methods: {
    moment
  }
}
</script>
