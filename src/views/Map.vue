<template>
  <div>
    <DeckGL :fireballs="fireballs" :loading="loading" :fireballYearRange="fireballYearRange"/>
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import FireballService from '@/services/FireballService.js'
import NProgress from 'nprogress'
import DeckGL from '@/components/DeckGL.vue'

export default {
  components: {
    DeckGL
  },
  data() {
    return {
      fireballs: [],
      fireballYearRange: [],
      loading: false
    }
  },
  methods: {
    fetchFireballs() {
      NProgress.start()
      this.loading = true
      FireballService.fetchFireballs()
        .then(response => {
          this.fireballs = FireballService.parseResponse(response.data)
          this.fireballYearRange = FireballService.getYearRange(this.fireballs)
          this.loading = false
          NProgress.done()
          this.$toasted.global.primary({ message: 'Data retrieved from NASA' })
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    },
    getDataForDateRange(range) {
      this.fireballs = FireballService.getFireballsForYearRange(range)
    }
  },
  created() {
    this.fetchFireballs()
  },
  mounted() {
    // Listen for updateRange event fired from slider
    EventBus.$on('updated-range', this.getDataForDateRange)
  }
}
</script>
