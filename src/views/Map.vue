<template>
  <div>
    <DeckGL :fireballs="fireballs" :fireballYearRange="fireballYearRange"/>
  </div>
</template>

<script>
import FireballService from '@/services/FireballService.js'
import DeckGL from '@/components/DeckGL.vue'

export default {
  components: {
    DeckGL
  },
  data() {
    return {
      fireballs: [],
      fireballYearRange: []
    }
  },
  created() {
    FireballService.fetchFireballs()
      .then(response => {
        this.fireballs = FireballService.parseResponse(response.data)
        this.fireballYearRange = FireballService.getYearRange(this.fireballs)
        this.$toasted.global.primary({ message: 'Data retrieved from NASA' })
      })
      .catch(error => {
        this.$toasted.show(error)
      })
  }
}
</script>
