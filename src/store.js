import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import ls from '@/services/ls'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex);

const initialState = {
    token: false,
    partie: null,
    finished: false,
    score:[]
};

export default new Vuex.Store({
    plugins: [persistedstate()],
    state: {
        token: false,
        partie: null,
        finished: false,
        score:[]
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
        },
        setFinished(state, value) {
            state.finished = value
        },
        setScore(state, value){
          state.score=value

        }
    },
    getters: {
        getPartie: (state) => {
            return state.partie
        },
        getScore:(state) =>{
          return state.score
        }
    },
    actions: {
        createPartie({ commit }, partie) {
            return api.post('parties', partie).then((res) => {
                commit('setPartie', res.data)
                return Promise.resolve(res)
            }).catch((err) => {
              return Promise.reject(err)
            })
        },

        finish({ commit }) {
            commit('setFinished', true)
        },

        editScore({commit}, value){
          commit('setScore',value)
        }

    }
})
