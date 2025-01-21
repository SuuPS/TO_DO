<script setup lang="ts">
import Input from "@/components/UI/Input.vue";
import Textarea from "@/components/UI/Textarea.vue";
import Select from "@/components/UI/Select.vue";
import {useTaskStore} from "@/store/task/taskStore.ts";
import {storeToRefs} from "pinia";
import Button from "@/components/UI/Button.vue";
import {useUsersStore} from "@/store/users/usersStore.ts";
import {onMounted, ref} from "vue";
import {Task} from "@/types/taskTypes.ts";
import {toast} from "vue3-toastify";

const { statusList, tasksList } = storeToRefs(useTaskStore())
const { userList } = storeToRefs(useUsersStore())

const { fetchUsers } = useUsersStore()
const { addTask, fetchTasks } = useTaskStore()

const newTaskt = ref<Task>({
  name: "",
  text: "",
  employee: "",
  status: "1"
})

const reset = () => {
  newTaskt.value.employee = ''
  newTaskt.value.text = ''
  newTaskt.value.employee = ''
}

const submit = async () => {
  try {
    const res = await addTask(newTaskt.value)
    toast("Задача добавлена", {
      type: 'success',
      autoClose: 1000,
    });
    reset()
  } catch (error) {
    toast(error, {
      type: 'danger',
      autoClose: 1000,
    });
  }
}

onMounted(async ()=>{
  fetchUsers()
  fetchTasks()
})

</script>

<template>
  <!-- Форма добавления задачи -->
  <div class="mb-6 bg-gray-100 p-4 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-4">Добавить задачу</h2>
    <form class="flex flex-col gap-4">

      <Input title="Название" v-model:value.trim="newTaskt.name"/>

      <Textarea title="Описание" v-model:value.trim="newTaskt.text"/>

      <Select title="Кто выполняет" :options="userList" v-model:value="newTaskt.employee"/>

    </form>
    <div class="mt-4">
      <Button
          @click="submit"
          title="Добавить задачу"/>
    </div>
  </div>
</template>
