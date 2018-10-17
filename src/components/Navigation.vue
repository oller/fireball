<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="`/`">
          <img alt="Fireball logo" src="../assets/images/fireball.svg" width="20" height="20">
        </router-link>
        <span
          class="navbar-burger burger has-text-white"
          @click="toggleResponsiveNav"
          :class="{ 'is-active': responsiveNavOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': responsiveNavOpen }">
        <div class="navbar-end">
          <router-link
            v-for="routes in links"
            class="navbar-item"
            v-bind:key="routes.id"
            active-class="is-active"
            exact
            :to="{ name: routes.name }"
          >{{routes.text}}</router-link>
          <a href="https://github.com/oller/fireball" class="navbar-item">
            <img src="../assets/images/github.svg" alt="Github Logo" width="20" height="20">
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    toggleResponsiveNav() {
      this.responsiveNavOpen = !this.responsiveNavOpen
      this.$emit('toggle-responsive-nav')
    }
  },
  data() {
    return {
      responsiveNavOpen: false,
      links: [
        {
          text: 'Map',
          name: 'map'
        },
        {
          text: 'About',
          name: 'about'
        }
      ]
    }
  }
}
</script>
