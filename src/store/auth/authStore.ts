import {defineStore} from 'pinia';
import {addUserFetch, getUserByLoginFetch} from "../../services/authService.ts";
import {User} from "../../types/User.ts";

const userFromLS = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;


interface authType extends User {
    isAuth: boolean;
}

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        auth: userFromLS || {} as authType,  // Указываем тип auth как authType
    }),
    actions: {
        async addUser(params: User) {
            try {
                const findUserRes = await getUserByLoginFetch(params.login)
                if (findUserRes.data.length > 0) {
                    throw new Error('Пользователь с таким логином уже существует'); // Выбрасываем ошибку
                } else {
                    const response = await addUserFetch(params);
                    this.auth = response.data;
                    this.auth.isAuth = true
                    localStorage.setItem('user', JSON.stringify(this.auth))
                }
            } catch (error) {
                throw error;
            }
        },

        async signIn(params: User) {
            try {
                const findUserRes = await getUserByLoginFetch(params.login)
                if (findUserRes.data.length > 0){
                    if (params.password === findUserRes.data[0].password) {
                        this.auth = findUserRes.data[0];  // Обновляем auth с полученными данными
                        this.auth.isAuth = true
                        localStorage.setItem('user', JSON.stringify(this.auth))
                    } else {
                        throw new Error('Неверный пароль'); // Более информативно
                    }
                }
                else {
                    throw new Error('Неверный логин'); // Более информативно
                }

            } catch (error) {
                throw error;
            }
        },
        async signOut(params: User) {
            this.auth = {isAuth: false} as authType;
            localStorage.removeItem('user');
        }
    },
    getters: {
        // Getter для получения текущего авторизованного пользователя
        currentUser(state) {
            return state.auth.isAuth ? state.auth : {isAuth: false};  // Если пользователь авторизован, возвращаем его данные
        }
    }
})

