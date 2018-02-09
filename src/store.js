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
    score: [],
    count: null,
    series: []
};

export default new Vuex.Store({
    plugins: [persistedstate()],
    state: {
        token: false,
        partie: null,
        finished: false,
        score: null,
        count: null,
        series: [],

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
          state.score = value
        },
        setCount(state, c) {
            state.count = c
        },
        setSeries(state, obj) {
            state.series = obj
        }
    },
    getters: {
        getPartie: (state) => {
            return state.partie
        },
        getScore: (state) => {
            return state.score
        },
        getCount: (state) => {
            return state.count
        },
        getSeries: (state) => {
            return state.series
        },
        isFinished: (state) => {
            return state.finished
        }
    },
    actions: {
        createPartie({ commit }, partie) {
            return api.post('parties', partie).then((res) => {
                commit('setPartie', res.data)
                commit('setFinished', false)
                return Promise.resolve(res)
            }).catch((err) => {
                return Promise.reject(err)

            })
        },

        finish({ commit, state}, new_score) {
            commit('setScore', new_score)
            return Promise.resolve('OK')
            
        },

        editScore({ commit }, value) {
            commit('setScore', value)
        },
        count({ commit }, serieId) {
            return api.get('series/' + serieId + '/count').then(res => {
                commit('setCount', res.data)
                return Promise.resolve(res)
            }).catch((err) => {
                return Promise.reject(err)
            })
        },
        loadSeries({commit}) {
            return api.get('series').then(res => {
                commit('setSeries', res.data)
                return Promise.resolve(res)
            }).catch((err) => {
                return Promise.reject(err)
            })
        },
        sendScore({commit, state}, global_score) {
            if(state.partie != null){
                return api.patch('parties/'+state.partie.token+'/score', {score: global_score.final_score}).then(res => {
                    commit('setScore', global_score)
                    commit('setFinished', true)
                    return Promise.resolve('Bien enregistré')
                }).catch(e => {
                    return Promise.reject(e)
                })
            }
            return Promise.reject('Aucune partie en cours')
        }
    }
})