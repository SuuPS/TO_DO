import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { addUserFetch, getUserByLoginFetch } from "../../services/userService.ts";
import { UserTypes } from "../../types/userTypes.ts";

// Получаем данные пользователя из localStorage, если они есть
const userFromLS = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

// Интерфейс для типа auth
interface AuthType extends UserTypes {
    isAuth: boolean;
    role?: string
}

export const useAuthStore = defineStore('authStore', () => {
    // Состояние
    const auth = ref<AuthType>(userFromLS || { isAuth: false } as AuthType);

    // Действия
    const addUser = async (params: UserTypes) => {
        try {
            const findUserRes = await getUserByLoginFetch(params.login);
            if (findUserRes.data.length > 0) {
                throw new Error('Пользователь с таким логином уже существует');
            } else {
                const response = await addUserFetch(params);
                auth.value = { ...response.data, isAuth: true };
                localStorage.setItem('user', JSON.stringify(auth.value));
            }
        } catch (error) {
            throw error;
        }
    };

    const signIn = async (params: UserTypes) => {
        try {
            const findUserRes = await getUserByLoginFetch(params.login);
            if (findUserRes.data.length > 0) {
                if (params.password === findUserRes.data[0].password) {
                    auth.value = { ...findUserRes.data[0], isAuth: true };
                    localStorage.setItem('user', JSON.stringify(auth.value));
                } else {
                    throw new Error('Неверный пароль');
                }
            } else {
                throw new Error('Неверный логин');
            }
        } catch (error) {
            throw error;
        }
    };

    const signOut = () => {
        auth.value = { isAuth: false } as AuthType;
        localStorage.removeItem('user');
    };

    // Геттеры
    const currentUser = computed(() => (auth.value.isAuth ? auth.value : { isAuth: false }));

    // Возвращаем всё, что нужно из хранилища
    return {
        auth,
        addUser,
        signIn,
        signOut,
        currentUser
    };
});
