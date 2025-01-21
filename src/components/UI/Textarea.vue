<script setup lang="ts">
interface Props {
  id?: string,
  type?: string,
  title?: string,
  disabled?: boolean,
  style?: string,
  placeholder?: string,
  rows?: string
}

const value = defineModel('value')

const props = defineProps<Props>()
</script>

<template>
  <!-- Количество для конвертации -->
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{title}}</label>
    <textarea
        :placeholder="placeholder || title + '...'"
        :disabled="disabled"
        v-model="value"
        :id="id"
        :class="style || 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'"
        :rows="rows">

    </textarea>
  </div>
</template>

<style scoped>

</style>
