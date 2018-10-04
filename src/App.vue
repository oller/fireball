<template>
  <div id="app">
    <Hero title="Everyone loves a good bolide" subtitle="Let's find some"></Hero>
    <router-view/>
    <Footer></Footer>
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
