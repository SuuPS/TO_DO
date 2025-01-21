<script setup lang="ts">
import {getCurrencyName} from "@/utils/exchangeHelper.ts";

export interface Options {
  id: string,
  name: string
}

interface Props {
  id?: string,
  title?: string,
  disabled?: boolean,
  style?: string,
  options: Options[]
}

const value = defineModel('value')

const props = defineProps<Props>()
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{title}}</label>
    <select
        :disabled="disabled"
        v-model="value"
        :id="id"
        :class="style || 'mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'">
      <option v-for="currency in options" :key="currency.name" :value="currency.name">
        {{ currency.name.toUpperCase() }} - {{ getCurrencyName(currency.name) }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>
