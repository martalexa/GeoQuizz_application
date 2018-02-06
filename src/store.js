import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex);

const initialState = {
    token: false,
    partie: null
};

export default new Vuex.Store({
    state: {
        token: false,
        partie: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            console.log(state.token)
        },
        setPartie(state, p) {
            state.partie = p
            console.log('New game session')
            console.log(state.partie)
        },
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        }
    },
    getters: {

    },
    actions: {
        createPartie({ commit }, partie) {
            api.post('parties', partie).then((res) => {
                api.get('parties/' + res.data.id).then((res) => {
                    commit('setPartie', res.data)
                }).catch((err) => {

                })
            }).catch((err) => {

            })
        }
    }
})