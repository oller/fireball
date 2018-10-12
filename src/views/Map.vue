<template>
  <div>
    <DeckGL :fireballs="fireballs"/>
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
      fireballs: []
    }
  },
  created() {
    FireballService.getFireballs()
      .then(response => {
        this.fireballs = FireballService.parseResponse(response.data)
        this.$toasted.global.primary({ message: 'Data retrieved from NASA' })
      })
      .catch(error => {
        this.$toasted.show(error)
      })
  }
}
</script>
