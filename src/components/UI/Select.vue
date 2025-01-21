<script setup lang="ts">

export interface Options {
  id: string,
  name: string
}

interface Props {
  id?: string,
  title?: string,
  disabled?: boolean,
  options: Options[],
  reset?: boolean
}

const value = defineModel('value')

const props = defineProps<Props>()
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{title}}
      <span v-if="reset" @click="value = null" class="cursor-pointer text-yellow-500">Очистить</span>
    </label>
    <select
        :disabled="disabled"
        v-model="value"
        :id="id"
        :class="disabled ? 'bg-gray-200' : 'bg-white'"
        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option v-for="currency in options" :key="currency.name" :value="currency.id">
        {{ currency.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>
