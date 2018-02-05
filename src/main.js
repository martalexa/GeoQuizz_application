// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import store from './store.js'
import axios from 'axios'
import Vue2Leaflet from 'vue2-leaflet';

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.use(Buefy)

window.axios = axios.create({
    baseURL: 'http://api.geoquizz.local:10080/',
});
Vue.config.productionTip = false
Vue.use(Buefy)

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
