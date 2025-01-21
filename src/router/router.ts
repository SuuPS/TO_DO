import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Расширяем стандартный тип маршрута, добавляя кастомное поле `permission`
interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
    permission?: string[]; // Дополнительное поле для прав доступа

}

// Типизация массива маршрутов
const routes: Array<CustomRouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Navbar.vue'),
        children: [
            {
                path: '/',
                name: 'ExchangeRates',
                permission: ['tender:get'],
                component: () => import('@/pages/TaskList.vue'),
            },
            {
                path: 'currency-converter',
                name: 'CurrencyConverter',
                permission: ['tender:get'],
                component: () => import('@/views/TaskFilter.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: 'Home',
        component: () => import('@/views/404.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }; // Управление прокруткой
    },
});

export default router;
