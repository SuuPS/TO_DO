import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Расширяем стандартный тип маршрута, добавляя кастомное поле `permission`
interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
    permission?: string[]; // Дополнительное поле для прав доступа
    children?: CustomRouteRecordRaw[]; // Рекурсивное определение для вложенных маршрутов
}

// Типизация массива маршрутов
const routes: Array<CustomRouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Navbar.vue'),
        children: [
            {
                path: 'task-filter',
                name: 'TaskFilter',
                component: () => import('@/pages/public/MainPage'),
            },
            {
                path: 'task-filter',
                name: 'TaskFilter',
                component: () => import('@/pages/TaskFilter.vue'),
            },
            {
                path: 'task-list',
                name: 'TaskList',
                permission: ['tender:get'], // Кастомное поле для прав доступа
                component: () => import('@/pages/TaskList.vue'),
            },
        ],
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
