import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('authStore', {
    state: () => ({
        auth: [],
    }),
    actions: {
        async fetchTasks() {
            const response = await axios.get('http://localhost:3000/tasks');
            this.tasks = response.data;
        },
        async addTask(task) {
            const response = await axios.post('http://localhost:3000/tasks', task);
            this.tasks.push(response.data);
        },
        async deleteTask(id) {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            this.tasks = this.tasks.filter((task) => task.id !== id);
        },
        async updateTask(id, updatedTask) {
            const response = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
            const index = this.tasks.findIndex((task) => task.id === id);
            if (index !== -1) {
                this.tasks[index] = response.data;
            }
        },
    },
});

