import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface MenuItem {
    title: string;
    name: string;
    current: boolean;
}

export const useMenuStore = defineStore('menu', () => {
    const menuState = ref<MenuItem[]>([
        { title: 'Главная', name: 'ExchangeRates', current: true },
        { title: 'Конвертация валют', name: 'CurrencyConverter', current: true },
    ]);

    const getMenuState = computed<MenuItem[]>(() => {
        return menuState.value;
    });

    return {
        getMenuState
    };
});
