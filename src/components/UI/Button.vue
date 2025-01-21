<script setup lang="ts">
interface Props {
  btnType?: 'button' | 'submit' | 'reset'; // Ограничиваем тип
  click?: () => void;
  title?: string;
  disabled?: boolean;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <button
      :type="props.btnType || 'button'"
      @click="props.click"
      :disabled="props.disabled || false"
      :class="[!props.disabled ? 'bg-indigo-600 hover:bg-indigo-700': 'bg-gray-400 cursor-not-allowed', 'w-full text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
    {{ props.title }}
  </button>
</template>
