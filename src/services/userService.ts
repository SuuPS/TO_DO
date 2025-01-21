import api from "../http";
import { UserTypes } from "../types/userTypes.ts";

const addUserFetch = async (params: UserTypes) => {
    return await api.post(`/users`, params);
}

const getUserByLoginFetch = async (login: string) => {
    return await api.get(`/users`, {
        params: {
            login: login
        }
    });
}

const getAllUserFetch = async () => {
    return await api.get(`/users`, );
}

export {
    addUserFetch,
    getUserByLoginFetch,
    getAllUserFetch
}
