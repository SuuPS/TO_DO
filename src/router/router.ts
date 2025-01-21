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
                path: '/',
                name: 'Main',
                component: () => import('@/views/public/MainPage'),
            },
            {
                path: 'task-list',
                name: 'TaskList',
                permission: ['tender:get'], // Кастомное поле для прав доступа
                component: () => import('@/views/tasks/TaskList.vue'),
            },
        ],
    },
    {
        path: '/sign-ip',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue'),
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
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
