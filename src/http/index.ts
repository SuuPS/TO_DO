import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';

// Интерфейс для конфигурации API
interface ApiConfig extends AxiosRequestConfig {
    headers?: {
        Authorization?: string;
    };
}

// Создание экземпляра Axios с базовым URL
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

// Интерсептор запроса для добавления заголовков и авторизации
api.interceptors.request.use(
    (config: ApiConfig) => {
        // if (config.headers) {

        // }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);  // Типизируем ошибку как AxiosError
    }
);

export default api;
