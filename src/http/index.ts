import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';

// Интерфейс для конфигурации API
interface ApiConfig extends AxiosRequestConfig {
    headers?: {
        Authorization?: string;
    };
}

// Создание экземпляра Axios с базовым URL
const api: AxiosInstance = axios.create({
    baseURL: 'https://data.fx.kg/api/v1/',
});

// Интерсептор запроса для добавления заголовков и авторизации
api.interceptors.request.use(
    (config: ApiConfig) => {
        if (config.headers) {
            config.headers.Authorization = 'Bearer Du35uaiDw9YWhyJGGRx51npBaCtDbc1QgZtYuNWp633f140d';
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);  // Типизируем ошибку как AxiosError
    }
);

export default api;
