<script setup lang="ts">
import {useUsersStore} from "@/store/users/usersStore.ts";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const {userList} = storeToRefs(useUsersStore())
const {fetchUsers} = useUsersStore()

onMounted(async ()=>{
  fetchUsers()
})
</script>

<template>
  <div class="container mx-auto py-6">
    <h2 class="text-2xl font-bold mb-6">Пользователи</h2>

    <!-- Пользователи -->
    <div class="col-span-9 overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-200 rounded-lg shadow text-sm">

          <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Логин</th>
            <th class="border border-gray-300 px-4 py-2 text-left">ФИО</th>
          </tr>
          </thead>

          <tbody>

          <tr v-for="user in userList" :key="user.id" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2">{{user.login}}</td>
            <td class="border border-gray-300 px-4 py-2">{{user.name}}</td>
          </tr>

          </tbody>
        </table>
      </div>
  </div>

</template>
