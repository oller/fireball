<template>
  <transition name="modal">
    <div v-if="show" class="modal is-active" data-test="modal">
      <div class="modal-background" @click="onClose"></div>
      <div class="modal-content" @click.stop><slot></slot></div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="onClose"
      ></button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: ['show'],
  methods: {
    onClose: function() {
      this.$emit('close')
    }
  },
  mounted: function() {
    // If modal open and ESC hit, close modal
    document.addEventListener('keydown', e => {
      if (this.show && e.keyCode == 27) {
        this.onClose()
      }
    })
  }
}
</script>
