<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import { useMenuStore } from "@/store/menu/menuStore.ts"

const { getMenuState } = useMenuStore()
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
              <span class="text-[#0075B3] italic">i</span>

              <!-- Черная часть логотипа с наклоном -->
              <span class="transform text-white -skew-x-6">инфоком</span>
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