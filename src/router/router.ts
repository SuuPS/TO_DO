import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {useAuthStore} from "../store/auth/authStore.ts";

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
        path: '/sign-in',
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

router.beforeEach((to, from, next) => {
    const publicPages = ['/sign-in', '/sign-up', '/404', '/403'] // Публичные страницы
    const authStore = useAuthStore()

    // Проверка авторизации
    if (!authStore.currentUser.isAuth) {
        // Если пользователь не авторизован и пытается попасть на страницу, которая не публичная
        if (!publicPages.includes(to.path)) {
            return next('/sign-in') // Редирект на страницу входа
        }
    }

    // Если мы не находимся на странице sign-in и не авторизованы, продолжаем переход
    next()
})


export default router;
