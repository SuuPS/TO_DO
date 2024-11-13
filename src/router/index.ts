import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Navbar.vue'),
        children: [
            {
                path: '',
                name: 'CurrentCurrencies',
                component: () => import('@/view/CurrentСurrencies.vue')
            },
            // // Создание || Редактирование
            // {
            //     path: '/tender-info',
            //     name: 'TenderInfo',
            //     // permission: ['tender:get'], // типизация под кастомные поля
            //     component: () => import('@/views/tender/TenderInfo.vue')
            // },
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