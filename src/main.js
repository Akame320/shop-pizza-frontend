import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { vfmPlugin } from 'vue-final-modal'

import vClickOutside from 'v-click-outside'
import './assets/styles/main.scss'

Vue.use(vClickOutside)
Vue.use(vfmPlugin)

Vue.prototype.$http = axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  console.log('тут')
}

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
