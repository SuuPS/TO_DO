import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface MenuItem {
    title: string;
    name: string;
    current: boolean;
}

export const useMenuStore = defineStore('menu', () => {
    const menuState = ref<MenuItem[]>([
        { title: 'Задачи', name: 'TaskList', current: true },
        { title: 'Пользователи', name: 'Users', current: false },
    ]);

    const getMenuState = computed<MenuItem[]>(() => {
        return menuState.value;
    });

    const route = useRoute();

    watch(route, (newRoute) => {
        menuState.value.forEach(item => {
            item.current = item.name === newRoute.name;
        });
    }, { immediate: true }); // сразу обновить при первом рендере

    return {
        getMenuState
    };
});
