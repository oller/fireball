<template>
  <div
    class="drawer has-background-black-ter has-text-white is-size-7 p-lg"
    :class="{ 'is-open': showDrawer }"
  >
    <span class="drawer-toggler p-md" @click="showDrawer = !showDrawer">
      <base-icon :icon="showDrawer ? 'info' : 'info_outline'" />
    </span>
    <div class="content">
      <div class="m-b-lg">
        <h3 class="has-text-weight-bold has-text-white">
          What am I Looking at?
        </h3>
        <p>
          A chart displaying all the recorded fireballs and bolides events from
          NASA's API.
        </p>
        <p>
          A log scale is applied to the radius calculation due to the massive
          <a href="https://en.wikipedia.org/wiki/Chelyabinsk_event" target="new"
            >Chelyabinsk Event</a
          >
          being such an extreme outlier in terms of energy radiated. (That's the
          big fella close to the Russia / Kazakhstan border).
          <a @click="showModal = true"
            >Check out a Russian dashcam video of this event</a
          >
        </p>
        <portal to="modal">
          <base-modal :show="showModal" @close="showModal = false">
            <iframe
              width="560"
              height="340"
              src="https://www.youtube-nocookie.com/embed/fBLjB5qavxY"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </base-modal>
        </portal>
        <p>
          To get a true sense of the scale of this event,
          <a @click="setChartToRadiatedLinear"
            >set the chart to a linear scale showing energy radiated</a
          >
        </p>
      </div>
    </div>
    <h4 class="has-text-weight-bold has-text-white m-b-sm">
      Scrub by date range
    </h4>
    <fireball-slider
      :is-visible="showDrawer"
      :dateRange="fireballYearRange"
      class="m-b-xl"
    ></fireball-slider>
    <h4 class="has-text-weight-bold has-text-white m-b-sm">
      Display energy for
    </h4>
    <div v-if="fireballs" class="tabs is-toggle is-fullwidth">
      <ul>
        <li
          v-for="metric in metrics"
          :key="metric.id"
          :class="{ 'is-active': metricToPlot === metric.id }"
          @click="setMetricToPlot(metric.id)"
        >
          <a class="has-text-white">
            <base-icon :icon="metric.icon" />
            <span>{{ metric.label }}</span>
          </a>
        </li>
      </ul>
    </div>
    <h4 class="has-text-weight-bold has-text-white m-b-sm">Radius scale</h4>
    <div v-if="fireballs" class="tabs is-toggle is-fullwidth">
      <ul>
        <li
          v-for="scale in scales"
          :key="scale.id"
          :class="{ 'is-active': scaleToPlot === scale.id }"
          @click="setScaleToPlot(scale.id)"
        >
          <a class="has-text-white">
            <span>{{ scale.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FireballSlider from '@/components/FireballSlider'

export default {
  components: {
    FireballSlider
  },
  props: {
    fireballYearRange: Array,
    fireballs: Array,
    metrics: Array,
    metricToPlot: String,
    scales: Array,
    scaleToPlot: String
  },
  data() {
    return {
      showDrawer: false,
      showModal: false
    }
  },
  methods: {
    setMetricToPlot(metric) {
      this.$emit('metric-updated', metric)
    },
    setScaleToPlot(scale) {
      this.$emit('scale-updated', scale)
    },
    setChartToRadiatedLinear() {
      this.setMetricToPlot('energy')
      this.setScaleToPlot('linear')
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  color: white;
  transition: all 0.5s cubic-bezier(0.87, 0.23, 0.15, 0.99);
  transform: translateX(-100%);
  height: 100%;
  width: 300px;
  z-index: 1;
  position: absolute;

  &.is-open {
    transform: translateX(0);
  }
}

// Toggle Arrow Icon to Pull Out / Away placement filter pane
.drawer-toggler {
  $width: 30px;
  position: absolute;
  top: 0;
  right: -$width;
  bottom: auto;
  left: auto;
  z-index: 9999;
  width: $width;
  cursor: pointer;
}
</style>
