<template>
  <div class="flex justify-center items-center space-x-2">
    <div class="w-12 h-12 border-4 border-t-transparent border-blue-600 border-solid rounded-full animate-spin"></div>
    <span class="text-gray-600 font-semibold text-lg">Загрузка...</span>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
