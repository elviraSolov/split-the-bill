import { createWebHashHistory, createRouter } from 'vue-router'
import BillsView from '../views/BillsView.vue'
import HomeView from '../views/HomeView.vue'
import PeopleView from '../views/PeopleView.vue'
import ResultView from '../views/ResultView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/bills',
            name: 'bills',
            component: BillsView
        },
        {
            path: '/people',
            name: 'people',
            component: PeopleView
        },
        {
            path: '/result',
            name: 'result',
            component: ResultView
        }
    ]
})

export default router