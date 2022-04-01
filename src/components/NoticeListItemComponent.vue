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
      <p class="text-xs text-secondary mb-0 text-truncate" style="max-width: 30ch">{{ content }}</p>
    </td>
    <td class="align-middle text-center text-sm">
      <span v-if="status === 'posted'" class="badge badge-sm bg-gradient-primary">{{ status }}</span>
      <span v-else class="badge badge-sm bg-gradient-secondary">{{ status }}</span>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{ moment(posted).format("DD/MM/YYYY") }}</span>
    </td>
    <td class="d-flex justify-content-center">
      <i class="material-icons" @click="$emit('edit-notice', { _id, title, content })" role="button">edit</i>
      <i class="material-icons" @click="Notice.remove($root.db, { _id, _rev })" role="button">close</i>
    </td>
  </tr>
</template>

<script>
import moment from "moment"
import Notice from "@/models/Notice.js"

export default {
  name: "NoticeListItemComponent",
  emits: [ "edit-notice" ],
  props: {
    _id: {
      type: String
    },
    _rev: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    status: {
      type: String
    },
    posted: {
      type: Number
    }
  },
  methods: {
    moment,
    Notice,
    async deleteNotice () {
      console.warn("Not implemented")
      // console.log(await Notice.remove({ this._id, this._rev }))
    }
  }
}
</script>