<template>
 <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm">{{ title }}</h6>
        </div>
      </div>
    </td>
    <td>
      <p class="text-xs text-secondary mb-0">{{ content }}</p>
    </td>
    <td class="align-middle text-center text-sm">
      <span v-if="status === 'posted'" class="badge badge-sm bg-gradient-primary">{{ status }}</span>
      <span v-else class="badge badge-sm bg-gradient-secondary">{{ status }}</span>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{ moment(posted).format("DD/MM/YYYY") }}</span>
    </td>
    <td class="align-middle text-center">
      <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
        Edit
      </a>
    </td>
  </tr>
</template>

<script>
import moment from "moment"

export default {
  name: "NoticeListItemComponent",
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    status: {
      type: String
    },
    created: {
      type: Date
    },
    posted: {
      type: Date
    }
  },
  methods: {
    moment: moment
  }
}
</script>