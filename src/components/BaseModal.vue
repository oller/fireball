<template>
  <transition name="modal">
    <div class="modal" :class="{'is-active': show}">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content" @click.stop>
        <slot></slot>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="close"></button>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    close: function() {
      this.$emit('close')
    }
  },
  mounted: function() {
    document.addEventListener('keydown', e => {
      if (this.show && e.keyCode == 27) {
        this.close()
      }
    })
  }
}
</script>
