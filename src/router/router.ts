import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Navbar.vue'),
        children: [
            {
                path: '',
                name: 'ExchangeRates',
                component: () => import('@/views/ExchangeRates.vue')
            },
            {
                path: 'currency-converter',
                name: 'CurrencyConverter',
                // permission: ['tender:get'], // типизация под кастомные поля
                component: () => import('@/views/CurrencyConverter.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    },
})

export default router