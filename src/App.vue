<template>
  <div id="app">
    <div class="content-wrapper">
      <hero
        title="Everyone loves a good bolide"
        subtitle="Let's find some"
      ></hero>
      <router-view />
    </div>
    <Footer class="footer" />
    <portal-target name="modal"></portal-target>
    <portal-target name="drawer-overlay"></portal-target>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Hero,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-wrapper {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
</style>
