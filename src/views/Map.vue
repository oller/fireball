<template>
  <div>
    <DeckGL
      :fireballs="fireballs"
      :loading="loading"
      :fireballYearRange="fireballYearRange"
    />
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import {
  fetchFireballs,
  parseResponse,
  getYearRange,
  getFireballsForYearRange
} from '@/services/FireballService.js'
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
      loading: true
    }
  },
  methods: {
    fetchFireballs() {
      NProgress.start()
      fetchFireballs()
        .then(response => {
          this.fireballs = parseResponse(response.data)
          this.fireballYearRange = getYearRange(this.fireballs)
          this.loading = false
          NProgress.done()
          this.$toasted.global.primary({ message: 'Data retrieved from NASA' })
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    },
    getDataForDateRange(range) {
      this.fireballs = getFireballsForYearRange(range)
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
