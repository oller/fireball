<template>
  <div>
    <div class="deck-wrapper">
      <div v-if="loading" class="fill-wrapper spinner-wrapper">
        <base-spinner :options="spinnerOptions"/>
      </div>
      <fireball-drawer
        :fireballYearRange="fireballYearRange"
        :fireballs="fireballs"
        :metrics="metrics"
        :metricToPlot="metricToPlot"
        :scales="scales"
        :scaleToPlot="scaleToPlot"
        @metric-updated="onMetricUpdated"
        @scale-updated="onScaleUpdated"
      />
      <div id="map" class="fill-wrapper"></div>
      <canvas id="deck-canvas" class="fill-wrapper"></canvas>
    </div>
    <fireball-tooltip :fireball="fireballHovered"/>
  </div>
</template>

<script>
import { Deck } from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { scaleSequential } from 'd3-scale'
import { interpolateRdPu } from 'd3-scale-chromatic'
import { rgbStringToArray } from '@/helpers/utils.js'
import FireballService from '@/services/FireballService'
import FireballTooltip from '@/components/FireballTooltip'
import FireballDrawer from '@/components/FireballDrawer'

// Init Map and Deck container Objects to be referenced across methods
let mapObject = null
let deckObject = null

export default {
  components: {
    FireballTooltip,
    FireballDrawer
  },
  props: {
    fireballs: Array,
    fireballYearRange: Array,
    loading: Boolean
  },
  data() {
    return {
      colorScale: null,
      fireballHovered: false,
      metricToPlot: 'energy',
      metrics: [
        {
          id: 'energy',
          icon: 'brightness_5',
          label: 'Radiated'
        },
        {
          id: 'impact-e',
          icon: 'whatshot',
          label: 'Impact'
        }
      ],
      scaleToPlot: 'log',
      scales: [
        {
          id: 'log',
          label: 'Logarithmic'
        },
        {
          id: 'linear',
          label: 'Linear'
        }
      ],
      spinnerOptions: {
        size: 100,
        color: '#333',
        depth: 5
      }
    }
  },
  watch: {
    fireballs() {
      // Watch for changes to fireballs prop populated by parent
      this.updateChart()
    },
    metricToPlot() {
      this.updateChart()
    },
    scaleToPlot() {
      this.updateChart()
    }
  },
  methods: {
    initDeckGL() {
      const INITIAL_VIEW_STATE = {
        latitude: 0,
        longitude: 0,
        zoom: 1,
        bearing: 0,
        pitch: 0
      }

      // Set your mapbox token here
      const mapTilerMapStyle = 'darkmatter' // darkmatter || positron
      const mapTilerKey = 'brJQrAEpE6ajrAylkOyb'

      mapObject = new mapboxgl.Map({
        container: 'map',
        style: `https://maps.tilehosting.com/styles/${mapTilerMapStyle}/style.json?key=${mapTilerKey}`,
        // Note: deck.gl will be in charge of interaction and event handling
        interactive: false,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        bearing: INITIAL_VIEW_STATE.bearing,
        pitch: INITIAL_VIEW_STATE.pitch
      })

      deckObject = new Deck({
        canvas: 'deck-canvas',
        width: '100%',
        height: '100%',
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        onViewStateChange: ({ viewState }) => {
          mapObject.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
          })
        }
      })
    },
    updateDeckLayer() {
      deckObject.setProps({
        layers: [
          new ScatterplotLayer({
            data: this.fireballs,
            pickable: true,
            autoHighlight: true,
            highlightColor: [35, 214, 187, 128],
            opacity: 0.3,
            radiusMinPixels: 2,
            getPosition: d => [d.lon, d.lat],
            getRadius: d => this.getMetricForScale(d),
            getColor: d =>
              rgbStringToArray(this.colorScale(Number(d[this.metricToPlot]))),
            onHover: hoveredObject => {
              this.fireballHovered = hoveredObject
            },
            onClick: clickedObject => console.log(clickedObject),
            transitions: {
              getColor: 200,
              getRadius: 200
            },
            updateTriggers: {
              getRadius: [this.metricToPlot, this.scaleToPlot],
              getColor: [this.metricToPlot, this.scaleToPlot]
            }
          })
        ]
      })
    },
    getMetricForScale(d) {
      // We also need to set the radiusScale based on scale being used
      let scaledMetricValue
      let radiusScale
      if (this.scaleToPlot === 'log') {
        radiusScale = 50000
        scaledMetricValue = Math.log(Number(d[this.metricToPlot]))
      } else if (this.scaleToPlot === 'linear') {
        radiusScale = 100
        scaledMetricValue = Number(d[this.metricToPlot])
      }
      return scaledMetricValue * radiusScale
    },
    updateColorScale() {
      const colorScale = interpolateRdPu
      const metricDomain = FireballService.getFireballMetricRange(
        this.fireballs,
        this.metricToPlot
      )
      this.colorScale = scaleSequential(colorScale).domain(metricDomain)
    },
    updateChart() {
      this.updateColorScale()
      this.updateDeckLayer()
    },
    onMetricUpdated(metric) {
      this.metricToPlot = metric
    },
    onScaleUpdated(scale) {
      this.scaleToPlot = scale
    }
  },
  mounted() {
    this.initDeckGL()
  }
}
</script>

<style lang="scss" scoped>
.deck-wrapper {
  height: calc(100vh - #{$navbar-height});
  position: relative;
  background: #1b1b1d;
}

.fill-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner-wrapper {
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
