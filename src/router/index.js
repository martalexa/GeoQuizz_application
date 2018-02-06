import Vue from 'vue'
import Router from 'vue-router'
import CreationPartie from '@/components/CreationPartie'
import JouerPartie from '@/components/JouerPartie'
import FinPartie from '@/components/FinPartie'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/creationpartie',
            component: CreationPartie
        },
        {
            path: '/jouerpartie',
            name: 'jouer',
            component: JouerPartie
        },
        {
            path: '/finpartie',
            component: FinPartie,
            name: 'fin'
        },
        {
            path: '*',
            component: CreationPartie
        }
    ]
})