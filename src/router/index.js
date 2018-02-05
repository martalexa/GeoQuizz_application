import Vue from 'vue'
import Router from 'vue-router'
import CreationPartie from '@/components/CreationPartie'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'CreationPartie',
        component: CreationPartie
    }]
})