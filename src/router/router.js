import MainPage from '@/pages/MainPage.vue'
import DayPage from '@/pages/DayPage.vue'
import SelectedMealPage from '@/pages/SelectedMealPage.vue'
import UsersListPage from '@/pages/UsersListPage.vue'
import FoodListPage from '@/pages/FoodListPage.vue'
import StatisticsPage from '@/pages/StatisticsPage.vue'
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
        path: '/users',
        component: UsersListPage
    },
    {
        path: '/foods',
        component: FoodListPage
    },
    {
        path: '/statistics',
        component: StatisticsPage
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
})
export default router