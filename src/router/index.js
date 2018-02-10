import Vue from 'vue'
import Router from 'vue-router'
import CreationPartie from '@/components/CreationPartie'
import JouerPartie from '@/components/JouerPartie'
import FinPartie from '@/components/FinPartie'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/creationpartie',
            component: CreationPartie,
            name: 'create_partie'
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

export default router

// router.beforeEach((to, from, next) => {
//     if (to.) {
//         // You can use store variable here to access globalError or commit mutation 
//         next("/Login")
//     } else {
//         next()
//     }
// })

