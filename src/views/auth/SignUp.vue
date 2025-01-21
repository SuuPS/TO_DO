<script setup lang="ts">
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";


</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 class="text-2xl font-bold mb-6 text-center">Регистрация</h2>

    <form class="space-y-4">

      <!-- Логин -->
      <Input
       title="Логин"/>

      <!-- Пароль -->
      <Input
          type="password"
          title="Пароль"/>

      <!-- Кнопка регистрации -->
      <div>
        <Button
            :disabled="true"
          title="Регистрация"/>
      </div>
    </form>

  </div>
</template>
