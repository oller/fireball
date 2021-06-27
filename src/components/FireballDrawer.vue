<template>
  <div class="drawer" :class="{ 'is-open': showDrawer }" data-test="drawer">
    <span
      class="drawer-toggler p-md"
      @click="showDrawer = !showDrawer"
      data-test="drawer-toggler"
    >
      <base-icon :icon="showDrawer ? 'info' : 'info_outline'" />
    </span>
    <div
      class="drawer-content has-background-black-ter has-text-white is-size-6 p-lg"
    >
      <div class="content">
        <div class="m-b-lg">
          <h3 class="has-text-weight-bold has-text-white">
            So... what am I Looking at?
          </h3>
          <p>
            A chart displaying all the recorded fireballs and bolides events
            from NASA's API.
          </p>
          <p>
            A log scale is applied to the radius calculation due to the massive
            <a
              href="https://en.wikipedia.org/wiki/Chelyabinsk_event"
              target="new"
              >Chelyabinsk Event</a
            >
            being such an extreme outlier in terms of energy radiated. (That's
            the big fella close to the Russia / Kazakhstan border).
            <a @click="showModal = true" data-test="fireball-modal"
              >Check out a Russian dashcam video of this event</a
            >
          </p>
          <portal to="modal">
            <base-modal :show="showModal" @close="showModal = false">
              <div class="image is-16by9">
                <iframe
                  id="ytplayer"
                  type="text/html"
                  width="1024"
                  height="576"
                  class="has-ratio"
                  src="https://www.youtube.com/embed/dpmXyJrs7iU?color=white"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </base-modal>
          </portal>
          <p>
            To get a true sense of the scale of this event,
            <a @click="setChartToRadiatedLinear">
              Set the chart to a linear scale showing energy radiated
            </a>
          </p>
        </div>
      </div>
      <h4 class="has-text-weight-bold has-text-white m-b-sm">
        Scrub by date range
      </h4>
      <fireball-slider
        :is-visible="showDrawer"
        :date-range="fireballYearRange"
        class="m-b-xl"
      />
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
            :data-test="`metricToggle-${metric.id}`"
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
            :data-test="`scaleToggle-${scale.id}`"
          >
            <a class="has-text-white">
              <span>{{ scale.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <portal to="drawer-overlay">
      <div
        v-show="showDrawer"
        @click="showDrawer = !showDrawer"
        class="drawer-overlay"
      ></div>
    </portal>
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
  transition: all 0.2s ease-in-out;
  transform: translateX(-100%);
  height: 100%;
  width: 300px;
  z-index: 1;
  position: absolute;
  &.is-open {
    transform: translateX(0);
  }
}

.drawer-content {
  height: 100%;
  overflow: auto;
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

.drawer-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
