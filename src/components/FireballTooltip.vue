<template>
    <div v-if="fireball.object" class="tooltip message has-background-grey-dark" :style="{top: fireball.y + 'px', left: fireball.x + 'px'}">
        <div class="message-body has-text-white is-size-7">
          <ul>
            <li class="m-b-xs"><base-icon class="m-r-sm is-size-7" icon="calendar_today"/>{{ fireball.object.date | moment }}</li>
            <li class="m-b-xs"><base-icon class="m-r-sm is-size-7" icon="location_on"/>{{ fireballLocation }}</li>
            <li class="m-b-xs"><base-icon class="m-r-sm is-size-7" icon="brightness_5"/>{{ fireball.object.energy | formatNumber }} joules</li>
            <li><base-icon class="m-r-sm is-size-7" icon="whatshot"/>{{ fireball.object['impact-e'] }} tons of TNT</li>
          </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    fireball: [Object, Boolean] // Deck returns either object on mouseenter or boolean on mouseleave
  },
  computed: {
    fireballLocation() {
      return `${this.fireball.object.lon}${this.fireball.object['lon-dir']},
        ${this.fireball.object.lat}${this.fireball.object['lat-dir']}`
    }
  },
  filters: {
    moment(date) {
      return moment(date).format('MMM Do YYYY, hh:mm')
    },
    formatNumber(number) {
      return Number(number).toLocaleString()
    }
  }
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  margin: 50px;
}
</style>
