import api from "../http";
import {Task} from "../types/taskTypes.ts";

const addTaskFetch = async (params: Task) => {
    return await api.post(`/tasks`, {...params, edit: false});
}

const removeTasksFetch = async (id: string) => {
    return await api.delete(`/tasks/${id}`,);
}

const editTaskFetch = async (params: Task) => {
    return await api.put(`/tasks/${params.id}`, {...params, edit: false});
}

const getAllTasks = async (params = {}) => {
    return await api.get(`/tasks`, {
        params: {...params}
    });
}

export {
    addTaskFetch,
    getAllTasks,
    removeTasksFetch,
    editTaskFetch
}
