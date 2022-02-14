<template>
  <section class="hero has-bg-image has-background-dark is-large">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <navigation @toggle-responsive-nav="onNavDimensionChange"></navigation>
    </div>
    <!-- Hero content: will be in the middle -->
    <div v-if="this.$route.name === 'about'" class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title has-text-white">{{ title }}</h1>
        <h2 class="subtitle has-text-white">{{ subtitle }}</h2>
      </div>
    </div>
    <canvas class="starfield" ref="starfield"></canvas>
  </section>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import Starfield from '@/helpers/starfield'

export default {
  name: 'Hero',
  components: {
    Navigation,
  },
  props: {
    title: String,
    subtitle: String,
  },
  methods: {
    initStarfield() {
      const starfield = new Starfield({
        canvas: this.$refs.starfield,
        maxRadius: 4,
        minInterval: 0.1,
        maxInterval: 3,
      })
      starfield.start()
    },
    onNavDimensionChange() {
      this.initStarfield()
    },
  },
  mounted() {
    this.initStarfield()
  },
  updated() {
    // Re-init on page change as header size may have changed
    this.initStarfield()
  },
}
</script>

<style scoped>
.starfield {
  height: 100%;
  width: 100%;
  position: absolute;
}
.has-bg-image {
  background-image: url('~@/assets/images/bg-stars.jpg');
  background-position: top center;
  background-size: cover;
  position: relative;
}
</style>
