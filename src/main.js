// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import store from './store.js'
import axios from 'axios'

Vue.use(Buefy)

Vue.component(Buefy.Checkbox.name, Buefy.Checkbox);
Vue.component(Buefy.Table.name, Buefy.Table);
Vue.component(Buefy.Switch.name, Buefy.Switch);

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