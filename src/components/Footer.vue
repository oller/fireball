<template>
  <footer class="footer" :class="{ 'm-t-xl': this.$route.name !== 'map'}">
    <div class="content has-text-centered is-size-7">
      <p>Some footer copy</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
