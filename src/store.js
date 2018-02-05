import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: false
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            console.log(state.token)
        },
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        }
    }
})