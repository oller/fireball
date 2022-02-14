import Vue from 'vue'
import App from './App.vue'
import registerPlugins from '@/plugins/index'
import loadBaseComponents from '@/helpers/BaseComponents.js'
import router from './router'
import './styles/main.scss'

registerPlugins()
loadBaseComponents()

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
