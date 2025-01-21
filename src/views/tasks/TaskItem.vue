<script setup lang="ts">
import {useExchangeStore} from "@/store/exchange/exchangeStore.js";
import dateHelper from "@/utils/dateHelper.js";
import { CombinedExchangeRate } from "@/store/exchange/exchangeTypes.js";
import exchangeHelpers from "@/utils/exchangeHelper.js";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import Loader from "@/components/Loader.js"

const currentDate = dateHelper.getCurrentDate()
const { averageExchangeRatesList, bestExchangeRatesList, banksExchangeRatesList} = storeToRefs(useExchangeStore())
const { fetchAverageExchangeRates, fetchBestExchangeRates, fetchBanksExchangeRates } = useExchangeStore()

const excgangeList = ref<CombinedExchangeRate[]>([])

onMounted(async () => {
  await fetchAverageExchangeRates();
  await fetchBestExchangeRates();
  await fetchBanksExchangeRates()
  excgangeList.value = exchangeHelpers.mergeExchangeRates(averageExchangeRatesList.value, bestExchangeRatesList.value);
})

</script>

<template>
  <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">

    <!-- Таблица с курсами валют -->
    <table class="min-w-full table-auto">
      <caption class="text-lg font-semibold text-gray-800 p-4 bg-gray-100">
        Средние и лучшие курсы валют текущего времени
      </caption>
      <thead class="bg-gray-800 text-white text-sm uppercase tracking-wider">
      <tr>
        <th class="px-6 py-3 text-left">Валюта</th>
        <th class="px-6 py-3 text-left">Средний курс покупки</th>
        <th class="px-6 py-3 text-left">Средний курс продажи</th>
        <th class="px-6 py-3 text-left">Лучший курс покупки</th>
        <th class="px-6 py-3 text-left">Лучший курс продажи</th>
        <th class="px-6 py-3 text-left">Дата</th>
      </tr>
      </thead>
      <tbody class="text-sm text-gray-900" v-if="excgangeList.length > 0">
      <tr v-for="(exchange, index) in excgangeList" :key="index" class="border-b">
        <td class="px-6 py-4">{{ exchange.name }}</td>
        <td class="px-6 py-4 text-green-500 font-semibold">{{ exchange.averageBuy }}</td>
        <td class="px-6 py-4 text-red-500 font-semibold">{{ exchange.averageSell }}</td>
        <td class="px-6 py-4 text-yellow-500 font-semibold">{{ exchange.bestBuy }}</td>
        <td class="px-6 py-4 text-yellow-500 font-semibold">{{ exchange.bestSell }}</td>
        <td class="px-6 py-4">{{ currentDate }}</td>
      </tr>
      </tbody>
      <!-- Если данные еще не загружены, показываем loader -->
      <tbody v-else class="h-64">
      <tr class="h-full">
        <td colspan="6" class="flex justify-center items-center h-full">
          <Loader />
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Таблица с курсами банков -->
    <table class="min-w-full table-auto">
      <caption class="text-lg font-semibold text-gray-800 p-4 bg-gray-100">
        Текущие курсы коммерческих банков
      </caption>
      <thead class="bg-gray-800 text-white text-sm uppercase tracking-wider">
      <tr>
        <th class="px-6 py-3 text-left">Банк</th>
        <th class="px-6 py-3 text-left">USD (Покупка)</th>
        <th class="px-6 py-3 text-left">USD (Продажа)</th>
        <th class="px-6 py-3 text-left">EUR (Покупка)</th>
        <th class="px-6 py-3 text-left">EUR (Продажа)</th>
        <th class="px-6 py-3 text-left">RUB (Покупка)</th>
        <th class="px-6 py-3 text-left">RUB (Продажа)</th>
        <th class="px-6 py-3 text-left">KZT (Покупка)</th>
        <th class="px-6 py-3 text-left">KZT (Продажа)</th>
      </tr>
      </thead>
      <!-- Если данные загружены, отображаем таблицу -->
      <tbody class="text-sm text-gray-900" v-if="banksExchangeRatesList.length > 0">
      <tr v-for="bank in banksExchangeRatesList" :key="bank.id" class="border-b">
        <td class="px-6 py-4">{{ bank.title }}</td>
        <td class="px-6 py-4" v-for="rate in bank.rates" :key="rate.type">
          {{ rate.buy_usd }} / {{ rate.sell_usd }}
        </td>
        <td class="px-6 py-4" v-for="rate in bank.rates" :key="rate.type">
          {{ rate.buy_eur }} / {{ rate.sell_eur }}
        </td>
        <td class="px-6 py-4" v-for="rate in bank.rates" :key="rate.type">
          {{ rate.buy_rub }} / {{ rate.sell_rub }}
        </td>
        <td class="px-6 py-4" v-for="rate in bank.rates" :key="rate.type">
          {{ rate.buy_kzt }} / {{ rate.sell_kzt }}
        </td>
      </tr>
      </tbody>
      <!-- Если данных нет, показываем loader -->
      <tbody v-else class="h-64">
      <tr class="h-full">
        <td colspan="9" class="flex justify-center items-center h-full">
          <Loader />
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>
