import Vue from 'vue'
import Toasted from 'vue-toasted' // https://github.com/shakee93/vue-toasted

const register = () => {
  // The basic ones with this.$toasted.show('Message')
  Vue.use(Toasted, {
    position: 'bottom-right',
    duration: 4000,
    iconPack: 'material'
  })

  // register the toast with the custom message
  // Usage: this.$toasted.global.error('Message')
  Vue.toasted.register(
    'error',
    payload => {
      if (!payload.message) return 'Oops.. Something Went Wrong..'
      return payload.message
    },
    {
      icon: 'error_outline',
      type: 'has-background-danger' // This will follow the color defined in bulma
      // containerClass: ['toastContainer'],
      // duration: 2000
      // action: {
      //   text: 'Close',
      //   onClick: (e, toast) => toast.goAway(0)
      // }
    }
  )

  // register the toast with the custom message
  // Usage: this.$toasted.global.primary('Message')
  Vue.toasted.register(
    'primary',
    payload => {
      if (!payload.message) return 'Oops.. Something Went Wrong..'
      return payload.message
    },
    {
      icon: 'check_circle_outline',
      type: 'has-background-success', // This will follow the color defined in bulma
      singleton: true
      // action: {
      //   text: 'Close',
      //   onClick: (e, toast) => toast.goAway(0)
      // }
    }
  )
}

export default register
