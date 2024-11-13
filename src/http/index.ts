import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

// Интерфейс для конфигурации API, если нужно передавать параметры или настройки
interface ApiConfig extends AxiosRequestConfig {
    headers: {
        Authorization?: string;
    };
}

const api: AxiosInstance = axios.create({
    baseURL: 'https://data.fx.kg/api/v1/', // Устанавливаем значение по умолчанию, если переменная не определена
});

// Интерсептор запроса для добавления заголовков и авторизации
api.interceptors.request.use(
    (config: ApiConfig) => {
        if (config.headers) {
            config.headers.Authorization = 'L5HoneK2u1F61cYy6IX6SLv7BkaYKVB2iZzfVBa9';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
