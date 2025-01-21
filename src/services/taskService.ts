import api from "../http";
import {Task} from "../types/taskTypes.ts";

const addTaskFetch = async (params: Task) => {
    return await api.post(`/tasks`, {...params, edit: false});
}

const removeTasksFetch = async (id: string) => {
    return await api.delete(`/tasks/${id}`,);
}

const getAllTasks = async () => {
    return await api.get(`/tasks`);
}

export {
    addTaskFetch,
    getAllTasks,
    removeTasksFetch
}
