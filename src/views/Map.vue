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
  fireballData,
  parseResponse,
  getYearRange,
  getFireballsForYearRange,
} from '@/services/FireballService.js'
import DeckGL from '@/components/DeckGL.vue'

export default {
  components: {
    DeckGL,
  },
  data() {
    return {
      fireballs: [],
      fireballYearRange: [],
      loading: true,
    }
  },
  methods: {
    fetchFireballs() {
      this.fireballs = parseResponse(fireballData)
      this.fireballYearRange = getYearRange(this.fireballs)
      this.loading = false
    },
    getDataForDateRange(range) {
      this.fireballs = getFireballsForYearRange(range)
    },
  },
  created() {
    this.fetchFireballs()
  },
  mounted() {
    // Listen for updateRange event fired from slider
    EventBus.$on('updated-range', this.getDataForDateRange)
  },
}
</script>
