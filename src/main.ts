import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from "./router/router.ts";
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
    .use(createPinia())
    .use(router)

app.mount('#app')
