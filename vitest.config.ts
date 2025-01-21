import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'jsdom', // Для работы с DOM в тестах
        globals: true,        // Автоматическое использование глобальных функций (например, `describe`)
        setupFiles: './vitest.setup.ts', // Если будет настройка (см. шаг 3)
    },
});
