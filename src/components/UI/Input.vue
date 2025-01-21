<script setup lang="ts">
interface Props {
  id?: string,
  type?: string,
  title?: string,
  disabled?: boolean,
  style?: string,
  placeholder?: string,
}

const value = defineModel('value')

const props = defineProps<Props>()
</script>

<template>
  <!-- Количество для конвертации -->
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{title}}</label>
    <input
        :placeholder="placeholder || title + '...'"
        :disabled="disabled"
        v-model="value"
        :type="type || 'text'"
        :id="id"
        :class="style || 'mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"/>
  </div>
</template>

<style scoped>

</style>
