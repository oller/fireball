<template>
  <button class="button">
    <base-icon v-if="icon" :icon="icon" />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    name: 'BaseButton',
    icon: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped></style>
