<script setup lang="ts">
import TaskItem from "@/views/tasks/TaskItem.vue";
import {storeToRefs} from "pinia";
import {useTaskStore} from "@/store/task/taskStore.ts";
import {useUsersStore} from "@/store/users/usersStore.ts";
import Input from "@/components/UI/Input.vue";
import Select from "@/components/UI/Select.vue";
import Button from "@/components/UI/Button.vue";
import {toast} from "vue3-toastify";
import {onMounted, ref} from "vue";
import {Task} from "@/types/taskTypes.ts";
import {hasRoles} from "@/services/adminServices.ts";
const { statusList, tasksList } = storeToRefs(useTaskStore())
const { userList } = storeToRefs(useUsersStore())
import {useAuthStore} from "@/store/auth/authStore.ts";

const { currentUser } = storeToRefs(useAuthStore())

const { deleteTask, editTask, fetchTasks } = useTaskStore()

const deleteItem = async (id: string) => {
  try {
    const res = await deleteTask(id)
    toast("Задача удалена", {
      type: 'success',
      autoClose: 1000,
    });
  } catch (error) {
    toast(error, {
      type: 'danger',
      autoClose: 1000,
    });
  }
}

const editItem = async (params: TaskItem, filter = {}) => {
  try {
    const res = await editTask(params, filter)
    toast("Задача изменена", {
      type: 'success',
      autoClose: 1000,
    });
  } catch (error) {
    toast(error, {
      type: 'danger',
      autoClose: 1000,
    });
  }
}

const filterValues = ref<Task>({
  name: '',
  employee: hasRoles(['admin']) ? '' : currentUser.value.id,
  status: ''
})

onMounted(async ()=>{
  fetchTasks(filterValues.value)
})

</script>

<template>
  <div class="container mx-auto py-6">

    <div class="grid grid-cols-12 gap-5">
      <TaskItem class="col-span-3"/>

      <div class="col-span-9">
        <!-- Фильтры -->
        <div class="mb-6 bg-gray-100 p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-4">Фильтры</h2>
          <form class="grid grid-cols-12 flex-col gap-4">

            <Input
                title="Название"
                class="col-span-3"
                v-model:value.trim="filterValues.name"/>

            <Select
                v-if="hasRoles(['admin'])"
                reset="true"
                title="Статус"
                class="col-span-3"
                :options="statusList"
                v-model:value="filterValues.status"/>

            <Select
                v-if="hasRoles(['admin'])"
                reset="true"
                title="Кто выполняет"
                class="col-span-3"
                :options="userList"
                v-model:value="filterValues.employee"/>

            <div class="flex items-end col-span-3">
              <Button
                  type="button"
                  @click="fetchTasks(filterValues)"
                  title="Обновить список"/>
            </div>
          </form>
        </div>

        <!-- Таблица задач -->
        <div class="overflow-x-auto">
          <table class="table-auto w-full border-collapse border border-gray-200 rounded-lg shadow text-sm">
            <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">Название</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Описание</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Кто выполняет</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Статус задачи</th>
              <th class="border border-gray-300 px-4 py-2 text-center">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr
                class="hover:bg-gray-50"
                v-for="item in tasksList"
                :key="item.id">
              <td class="border border-gray-300 px-4 py-2">
                <Input
                    :disabled="!item.edit"
                    v-model:value="item.name"/>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <Input
                    :disabled="!item.edit"
                    v-model:value="item.text"/>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <Select
                    :disabled="!item.edit"
                    :options="userList"
                    v-model:value="item.employee"/>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <Select
                    v-if="hasRoles(['admiin'])"
                    :disabled="!item.edit"
                    :options="statusList"
                    v-model:value="item.status"/>
                <Select
                    v-else
                    :options="statusList"
                    v-model:value="item.status"/>
              </td>
              <td class="border border-gray-300 px-4 py-2 text-center">
                <div class="flex space-x-2">
                  <!-- Кнопка "Редактировать" -->
                  <button
                      v-if="!item.edit && hasRoles(['admin'])"
                      @click="item.edit = !item.edit"
                      class="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200">
                    ✏️ Редактировать
                  </button>

                  <button
                      v-else
                      @click="editItem(item, filterValues)"
                      class="px-2 py-1 text-sm font-medium bg-green-300 rounded">
                    Сохранить
                  </button>

                  <!-- Кнопка "Удалить" -->
                  <button
                      v-if="hasRoles(['admin'])"
                      class="px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200"
                      @click="deleteItem(item.id)">
                    🗑️ Удалить
                  </button>
                </div>

              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
