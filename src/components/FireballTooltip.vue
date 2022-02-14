<template>
  <div
    v-if="fireball.object"
    class="tooltip message is-small has-background-grey-dark"
    :style="{ top: fireball.y + 'px', left: fireball.x + 'px' }"
  >
    <div class="message-body has-text-white">
      <ul>
        <li class="m-b-xs">
          <base-icon class="m-r-sm is-size-7" icon="calendar_today" />
          {{ fireball.object.date | formatDate }}
        </li>
        <li v-if="fireball.object.alt" class="m-b-xs">
          <base-icon class="m-r-sm is-size-7" icon="arrow_upward" />
          {{ fireball.object.alt }} km
        </li>
        <li class="m-b-xs">
          <base-icon class="m-r-sm is-size-7" icon="brightness_5" />
          {{ fireball.object.energy | formatNumber }} joules
        </li>
        <li>
          <base-icon class="m-r-sm is-size-7" icon="whatshot" />
          {{ fireball.object['impact-e'] | formatNumber }} tons of TNT
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { parseJSON, format } from 'date-fns'
export default {
  props: {
    fireball: [Object, Boolean], // Deck returns either object on mouseenter or boolean on mouseleave
  },
  filters: {
    formatDate(date) {
      return format(parseJSON(date), 'dd/MM/yyyy @ HH:mm')
    },
    formatNumber(number) {
      return Number(number).toLocaleString()
    },
  },
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  margin: 50px;
}
</style>
