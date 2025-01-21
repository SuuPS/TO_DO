<script setup lang="ts">
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";
import {computed, reactive, ref} from "vue";
import {User} from "@/types/User.ts";
import {useAuthStore} from "@/store/auth/authStore.ts";
import {toast} from 'vue3-toastify';
import {useRouter} from "vue-router";

const router = useRouter()

const {signIn} = useAuthStore()

const params = ref<User>({
  login: '',
  password: '',
})

const submit = async () => {
  try {
    const res = await signIn(params.value)
    await toast("Авторизация прошла успешно!", {
      type: 'success',
      autoClose: 1000,
    });
    await router.push({name: 'Main'})
  } catch (error) {
    toast(error, {
      type: 'danger',
      autoClose: 1000,
    }); // ToastOptions
  }
}

const validate = computed(() => {
  return !(params.value.login && params.value.password)
})

</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 class="text-2xl font-bold mb-6 text-center">Авторизация</h2>

    <form class="space-y-4">

      <!-- Логин -->
      <Input
          v-model:value="params.login"
          title="Логин"/>

      <!-- Пароль -->
      <Input
          v-model:value="params.password"
          title="Пароль"/>

      <!-- Кнопка регистрации -->
      <div>
        <Button
            :disabled="validate"
            type="button"
            @click="submit"
            title="Войти"/>
      </div>

      <!-- Ссылка для перехода на страницу регистрации -->
      <p class="mt-4 text-sm text-center text-gray-600">
        Вы еще не зарегистрированы?
        <router-link :to="{name: 'SignUp'}" class="text-blue-600 hover:underline font-medium">
          Создать аккаунт
        </router-link>
      </p>
    </form>

  </div>
</template>
