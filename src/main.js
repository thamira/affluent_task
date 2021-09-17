import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import store from './plugins/store'
import Toasted from 'vue-toasted';

 
Vue.use(Toasted)


import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBaxjFUjqpP-_zSk1xOg_S8eigGg0eOCuo',
    libraries: 'places',
  }
});



Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  VueGoogleMaps,
  store,
  Toasted,
  render: h => h(App)
}).$mount('#app')