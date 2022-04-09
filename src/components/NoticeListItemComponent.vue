<template>
 <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center text-truncate">
          <h6 class="mb-0 text-sm">{{ title }}</h6>
        </div>
      </div>
    </td>
    <td>
      <p class="text-xs text-secondary mb-0 text-truncate" style="max-width: 30ch">{{ content }}</p>
    </td>
    <td class="align-middle text-center text-sm">
      <span v-if="isPosted" class="badge badge-sm bg-gradient-primary">{{ status }}</span>
      <span v-else class="badge badge-sm bg-gradient-secondary">{{ status }}</span>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{ posted ? moment(posted).format("DD/MM/YYYY") : 'NO' }}</span>
    </td>
    <td class="align-middle text-center">
      <i class="material-icons" v-show="$store.getters.isAdmin && !posted" @click="$emit('post-notice', { _id })" role="button">post_add</i>
      <i
      class="material-icons btn-tooltip"
        v-show="!posted || $store.getters.isAdmin"
        @click="$emit('edit-notice', { _id, title, content })"
        role="button"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Edit notice"
        data-container="body"
        data-animation="true">
        edit
      </i>
      <i class="material-icons" @click="deleteNotice()" role="button">close</i>
    </td>
  </tr>
</template>

<script>
import moment from "moment"
import Notice from "@/models/Notice.js"

export default {
  name: "NoticeListItemComponent",
  emits: [ "edit-notice", "post-notice" ],
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
    deleteNotice () {
      if (confirm("Are you sure?")) {
        Notice.remove(this.$root.db, { _id: this._id, _rev: this._rev })
      }
    }
  },
  computed: {
    isPosted () {
      return this.status === Notice.status.POSTED
    }
  }
}
</script>