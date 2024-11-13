<script setup lang="ts">

</script>

<template>
  <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
    <table class="min-w-full table-auto">
      <thead class="bg-gray-800 text-white text-sm uppercase tracking-wider">
      <tr>
        <th class="px-6 py-3 text-left">Currency</th>
        <th class="px-6 py-3 text-left">Buy</th>
        <th class="px-6 py-3 text-left">Sell</th>
        <th class="px-6 py-3 text-left">Change (%)</th>
        <th class="px-6 py-3 text-left">Date</th>
      </tr>
      </thead>
      <tbody class="text-sm text-gray-900">
      <tr class="border-b">
        <td class="px-6 py-4">USD</td>
        <td class="px-6 py-4 text-green-500 font-semibold">82.50</td>
        <td class="px-6 py-4 text-red-500 font-semibold">82.90</td>
        <td class="px-6 py-4 text-green-600">+0.45%</td>
        <td class="px-6 py-4">2024-11-13</td>
      </tr>
      <tr class="border-b">
        <td class="px-6 py-4">EUR</td>
        <td class="px-6 py-4 text-green-500 font-semibold">90.00</td>
        <td class="px-6 py-4 text-red-500 font-semibold">90.50</td>
        <td class="px-6 py-4 text-green-600">+0.30%</td>
        <td class="px-6 py-4">2024-11-13</td>
      </tr>
      <tr class="border-b">
        <td class="px-6 py-4">GBP</td>
        <td class="px-6 py-4 text-green-500 font-semibold">102.10</td>
        <td class="px-6 py-4 text-red-500 font-semibold">102.50</td>
        <td class="px-6 py-4 text-green-600">+0.25%</td>
        <td class="px-6 py-4">2024-11-13</td>
      </tr>
      <tr class="border-b">
        <td class="px-6 py-4">CHF</td>
        <td class="px-6 py-4 text-green-500 font-semibold">91.20</td>
        <td class="px-6 py-4 text-red-500 font-semibold">91.70</td>
        <td class="px-6 py-4 text-green-600">+0.40%</td>
        <td class="px-6 py-4">2024-11-13</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>