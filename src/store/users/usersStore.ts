import {ref, computed, onUnmounted, onMounted} from 'vue';
import { defineStore } from 'pinia';
import { getAllUserFetch } from "../../services/userService.ts";
import { UserTypes } from "../../types/userTypes.ts";

export const useUsersStore = defineStore('userStore', () => {

    const usersState = ref<UserTypes[]>([])

    const fetchUsers = async () => {
        try {
            const response = await getAllUserFetch();
            usersState.value = response.data
        } catch (error) {
            console.log(error, 'error')
        }
    };

    const userList = computed(() => usersState.value);

    return {
        userList,
        fetchUsers
    };
});
