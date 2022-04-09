<template>
  <div class="modal fade" :id="modalClass" tabindex="-1" role="dialog" :aria-labelledby="modalClass" aria-hidden="true">
    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title font-weight-normal" id="modal-title-default">{{ title }}</h6>
          <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="py-3 text-center">
            <i style="font-size: 3rem" class="material-icons text-secondary">
              {{ icon }}
            </i>
            <h4 :class="`text-gradient text-${type} mt-4`">
              {{ header }}
            </h4>
            <p>
              {{ content }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button v-show="acceptedButton" type="button" class="btn bg-gradient-primary" data-bs-dismiss="modal" @click="$emit('accepted')">
            {{ acceptedButton }}
          </button>
          <button type="button" class="btn btn-link  ml-auto" data-bs-dismiss="modal" @click="$emit('declined')">{{ declinedButton }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  emits: [ 'accepted', 'declined' ],
  props: {
    modalClass: {
      type: String,
      default: "modal-default"
    },
    title: {
      type: String,
      default: "Your attention is required"
    },
    header: {
      type: String,
    },
    icon: {
      type: String,
      default: "error_outline"
    },
    type: {
      type: String,
      default: "info"
    },
    content: {
      type: String
    },
    acceptedButton: {
      type: String,
      default: "Ok"
    },
    declinedButton: {
      type: String,
      default: "Close"
    }
  }
}
</script>