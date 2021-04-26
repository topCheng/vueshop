import 'babel-polyfill' //es6转es5兼容IE
import 'url-search-params-polyfill';//让ie兼容new URLSearchParams()
import Vue from 'vue'
import App from './App.vue'
import Router from './router.js'
import store from './store'
import config from './assets/js/conf/config'
import utils from "./assets/js/utils/index"

Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;

new Vue({
  store,
  router: Router,
  render: h => h(App),
}).$mount('#app')
