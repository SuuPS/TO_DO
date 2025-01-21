import {defineStore} from 'pinia';
import {Options} from "../../components/UI/Select.vue";
import { ref, computed } from 'vue';
import {Task} from "../../types/taskTypes.ts";
import {UserTypes} from "../../types/userTypes.ts";
import {addTaskFetch, getAllTasks, removeTasksFetch, editTaskFetch} from "../../services/taskService.ts";

export const useTaskStore = defineStore('taskStore', () => {

    const statuses = ref<Options[]>([
        { id: "1", name: "Не выполнена" },
        { id: "2", name: "Выполнена" },
    ])

    const tasks = ref<Task[]>([])

    const addTask = async (params: Task) => {
        try {
            const response = await addTaskFetch(params);
            fetchTasks()

        } catch (error) {
            throw error;
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const response = await removeTasksFetch(id);
            fetchTasks()
        } catch (error) {
            throw error;
        }
    };

    const editTask = async (params: Task) => {
        console.log(params, '234')
        try {
            const response = await editTaskFetch(params);
            fetchTasks()
        } catch (error) {
            throw error;
        }
    };

    const fetchTasks = async (params = {}) => {
        try {
            const response = await getAllTasks(params);
            tasks.value = response.data
        } catch (error) {
            throw error;
        }
    };


    const tasksList = computed(() => tasks.value);
    const statusList = computed(() => statuses.value);

    // Возвращаем всё, что нужно из хранилища
    return {
        statusList,
        tasksList,
        addTask,
        fetchTasks,
        deleteTask,
        editTask
    };
});


