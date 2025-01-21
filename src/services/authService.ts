import api from "../http";
import { User } from "../types/User";

const addUserFetch = async (params: User) => {
    return await api.post(`/users`, params);
}

const getUserByLoginFetch = async (login: string) => {
    return await api.get(`/users`, {
        params: {
            login: login
        }
    });
}

export {
    addUserFetch,
    getUserByLoginFetch
}
