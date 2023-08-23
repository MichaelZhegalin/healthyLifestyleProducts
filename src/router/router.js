import MainPage from '../pages/MainPage.vue'
import DayPage from '../pages/DayPage.vue'
import SelectedMealPage from '../pages/SelectedMealPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/day',
        component: DayPage
    },
    {
        path: '/day/:meal',
        component: SelectedMealPage
    },
    {
        path: '/day/:meal',
        component: SelectedMealPage
    },
    {
        path: '/day/:meal',
        component: SelectedMealPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router