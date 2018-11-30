<template>
  <div id="app">
    <hero
      title="Everyone loves a good bolide"
      subtitle="Let's find some"
    ></hero>
    <router-view />
    <Footer></Footer>
    <portal-target name="modal"></portal-target>
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
    Footer
  }
}
</script>
