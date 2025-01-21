import {defineStore} from 'pinia';
import {addUserFetch, getUserByLoginFetch} from "../../services/authService.ts";
import {User} from "../../types/User.ts";

const userFromLS = JSON.parse(localStorage.getItem('auth'))

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
                    console.log(response, '123')
                    this.auth = response.data;  // Обновляем auth с полученными данными
                    localStorage.setItem('user', JSON.stringify(this.auth))
                    this.auth.isAuth = true
                }
            } catch (error) {
                throw error;
            }
        },

        async signIn(params: User) {
            try {
                const findUserRes = await getUserByLoginFetch(params.login)
                if (findUserRes.data.length > 0) {
                    this.auth = findUserRes.data[0];  // Обновляем auth с полученными данными
                    localStorage.setItem('user', JSON.stringify(this.auth))
                    this.auth.isAuth = true
                }
            } catch (error) {
                throw error;
            }
        },
        async signOut(params: User) {
            this.auth = {}
            localStorage.removeItem('user')
            this.auth.isAuth = false
        }
    },
    getters:{

    }
})

