<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {useMenuStore} from "@/store/menu/menuStore.ts"
import {useAuthStore} from "@/store/auth/authStore.ts";
import {toast} from "vue3-toastify";
import {useRouter} from "vue-router";

const router = useRouter()

const authStore = useAuthStore()

const { getMenuState } = useMenuStore()

const { signOut } = useAuthStore()

const logOut = async () => {
  try {
    const res = await signOut()
    await toast("Вы вышли с аккаунта!", {
      type: 'success',
      autoClose: 1000,
    });
    // Явное ожидание завершения тоста (1000 мс)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // После завершения тоста, выполняем переход
    await router.push({ name: 'SignIn' });
  } catch (error) {
    toast(error, {
      type: 'danger',
      autoClose: 1000,
    }); // ToastOptions
  }
}

</script>


<template>
  <Disclosure as="nav" class="bg-gray-800 mb-3" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5"/>
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true"/>
            <XMarkIcon v-else class="block size-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <div class="flex items-start space-x-1 font-bold text-4xl">
              <!-- Синяя часть логотипа -->
              <span class="text-[#0075B3] italic">TO</span>

              <!-- Черная часть логотипа с наклоном -->
              <span class="transform text-white -skew-x-6">DO</span>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                  v-for="item in getMenuState"
                  :key="item.name"
                  :to="{name: item.name}"
                 :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                 :aria-current="item.current ? 'page' : undefined">{{ item.title }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <div class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{{authStore.auth.name}}</div>
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <button @click="logOut" :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Выйти</button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
            v-for="item in getMenuState" :key="item.name" as="a"
            :href="item.name"
            :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined">{{ item.title }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <router-view class="container m-auto"></router-view>
</template>
