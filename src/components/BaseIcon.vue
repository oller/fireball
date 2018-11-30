<template>
  <i class="material-icons" v-text="icon" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'star'
    }
  }
}
</script>
