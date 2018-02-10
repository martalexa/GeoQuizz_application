// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import axios from 'axios'
import Vue2Leaflet from 'vue2-leaflet'
import Vuetify from 'vuetify'
import ('../node_modules/vuetify/dist/vuetify.min.css')	
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

window.axios = axios.create({
    baseURL: 'http://api.geoquizz.local:10080/',
});
Vue.config.productionTip = false

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
