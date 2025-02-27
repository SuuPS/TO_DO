import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Устанавливаем алиас для "src" папки
    },
    extensions: ['.js', '.ts', '.vue'], // Добавьте .vue
  }
})
