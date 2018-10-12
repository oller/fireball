<template>
    <div>
        <div v-if="fireballs" class="deck-wrapper">
            <!-- <div class="deck-toolbar p-md">
              <base-button icon="date_range" class="is-outlined is-white"></base-button>
            </div> -->
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
import { interpolateYlOrRd } from 'd3-scale-chromatic'
import { rgbStringToArray } from '@/helpers/utils.js'
import FireballService from '@/services/FireballService'
import FireballTooltip from '@/components/FireballTooltip'

// Init Map and Deck container Objects to be referenced across methods
let mapObject = null
let deckObject = null

export default {
  components: {
    FireballTooltip
  },
  props: {
    fireballs: Array
  },
  data() {
    return {
      colorScale: null,
      fireballHovered: false
    }
  },
  watch: {
    fireballs() {
      // Watch for changes to fireballs prop populated by parent
      // Trigger redraw of layer when present
      this.updateColorScale()
      this.updateDeckLayer()
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
            highlightColor: [35, 214, 187, 128], // @aqua from atp color pallete
            opacity: 0.6,
            radiusScale: 10,
            radiusMinPixels: 2,
            radiusMaxPixels: 100,
            getPosition: d => [d.lon, d.lat],
            getRadius: d => Number(d.energy),
            getColor: d => rgbStringToArray(this.colorScale(Number(d.energy))),
            onHover: hoveredObject => {
              this.fireballHovered = hoveredObject
            }
          })
        ]
      })
    },
    updateColorScale() {
      const energyDomain = FireballService.getFireballEnergyRange(
        this.fireballs
      )
      this.colorScale = scaleSequential(interpolateYlOrRd).domain(energyDomain)
    }
  },
  mounted() {
    this.initDeckGL()
  }
}
</script>

<style lang="scss" scoped>
.deck-wrapper {
  background: #1b1b1d;

  > .fill-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.deck-toolbar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
