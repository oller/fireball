<template>
    <div>
        <vue-slider ref="slider"
        v-if="dateRange.length"
        v-model="selectedDateRange"
        v-bind="dateSliderOptions"
        :min="dateRange[0]"
        :max="dateRange[1]"
        @callback="callback">
        </vue-slider>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  components: {
    vueSlider
  },
  props: {
    dateRange: {
      type: Array
    }
  },
  watch: {
    // We've mapped a prop to a data property, as we shouldn't mutate a prop.
    // Data only instanced initially so we need to watch and update data attribute
    dateRange(newValue) {
      this.selectedDateRange = newValue
    }
  },
  methods: {
    callback() {
      this.$emit('updatedRange', this.selectedDateRange)
    }
  },
  data() {
    return {
      selectedDateRange: this.dateRange,
      dateSliderOptions: {
        tooltipDir: 'bottom',
        bgStyle: {
          backgroundColor: '#fff',
          boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        sliderStyle: [
          {
            backgroundColor: '#333'
          },
          {
            backgroundColor: '#444'
          }
        ],
        tooltipStyle: [
          {
            backgroundColor: '#333',
            borderColor: '#333'
          },
          {
            backgroundColor: '#444',
            borderColor: '#444'
          }
        ],
        processStyle: {
          backgroundImage: '-webkit-linear-gradient(left, #333, #444)'
        }
      }
    }
  }
}
</script>
