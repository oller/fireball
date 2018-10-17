<template>
  <div>
    <spinner v-bind="options"/>
  </div>
</template>

<script>
import Spinner from 'vue-spinner-component/src/Spinner'

export default {
  components: {
    Spinner
  },
  props: {
    options: {
      type: Object
    }
  }
}
</script>
