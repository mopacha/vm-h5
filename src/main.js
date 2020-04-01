import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

// 引入icon
import './icons'
import registerComponents from './utils/registerComponents'
Vue.use(registerComponents)
Vue.use(mandMobile)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
