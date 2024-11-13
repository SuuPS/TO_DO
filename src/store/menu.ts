import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface MenuItem {
    name: string;
    href: string;
    current: boolean;
}

export const useMenuStore = defineStore('menu', () => {
    const menuState = ref<MenuItem[]>([
        { name: 'Dashboard', href: '#', current: true },
        { name: 'Team', href: '#', current: false },
        { name: 'Projects', href: '#', current: false },
        { name: 'Calendar', href: '#', current: false },
    ]);

    const getMenuState = computed<MenuItem[]>(() => {
        return menuState.value;
    });

    return {
        getMenuState
    };
});
