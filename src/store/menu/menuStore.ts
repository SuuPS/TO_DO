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
        { title: 'Главная', name: 'ExchangeRates', current: true },
        { title: 'Конвертация валют', name: 'CurrencyConverter', current: false },
    ]);

    const getMenuState = computed<MenuItem[]>(() => {
        return menuState.value;
    });

    const route = useRoute();

    watch(route, (newRoute) => {
        // Сбрасываем все флаги `current` в меню
        menuState.value.forEach(item => {
            item.current = item.name === newRoute.name;
        });
    }, { immediate: true }); // сразу обновить при первом рендере

    return {
        getMenuState
    };
});
