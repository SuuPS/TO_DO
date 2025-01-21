<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useExchangeStore } from "@/store/exchange/exchangeStore.js";
import { convertCurrency, getCurrencyName } from "@/utils/exchangeHelper.js";

const {useUpdatedExchangeRates} = useExchangeStore()

// Получаем данные из магазина и обновленный список валют
const updatedExchangeRatesList = useUpdatedExchangeRates();

// Загрузка данных при монтировании компонента
onMounted(async () => {
  const { fetchAverageExchangeRates } = useExchangeStore();
  await fetchAverageExchangeRates();
});

// Реактивные переменные для выбора валюты и количества
const fromCurrency = ref("usd");
const toCurrency = ref("usd");
const amount = ref(0);
const convertedAmount = ref(0);

// Функция конвертации
const handleConvertCurrency = () => {
  const fromRate = updatedExchangeRatesList.value.find(rate => rate.name === fromCurrency.value);
  const toRate = updatedExchangeRatesList.value.find(rate => rate.name === toCurrency.value);

  if (fromRate && toRate && amount.value > 0) {
    convertedAmount.value = convertCurrency(fromRate, toRate, amount.value);
  } else {
    convertedAmount.value = 0;
  }
};
</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 class="text-2xl font-bold mb-6 text-center">Currency Converter</h2>

    <form class="space-y-4">
      <!-- От какой валюты -->
      <div>
        <label for="toCurrency" class="block text-sm font-medium text-gray-700">От какой валюты</label>
        <select v-model="toCurrency" id="toCurrency" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="currency in updatedExchangeRatesList" :key="currency.name" :value="currency.name" :disabled="currency.name === fromCurrency">
            {{ currency.name.toUpperCase() }} - {{ getCurrencyName(currency.name) }}
          </option>
        </select>
      </div>

      <!-- В какую валюту -->
      <div>
        <label for="fromCurrency" class="block text-sm font-medium text-gray-700">В какую валюту</label>
        <select v-model="fromCurrency" id="fromCurrency" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="currency in updatedExchangeRatesList" :key="currency.name" :value="currency.name" :disabled="currency.name === toCurrency">
            {{ currency.name.toUpperCase() }} - {{ getCurrencyName(currency.name) }}
          </option>
        </select>
      </div>

      <!-- Количество для конвертации -->
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input v-model.number="amount" type="number" id="amount" placeholder="Enter amount" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Кнопка конвертации -->
      <div>
        <button
            type="button"
            @click="handleConvertCurrency"
            :disabled="fromCurrency === toCurrency || amount <= 0"
            :class="{
            'bg-indigo-600 hover:bg-indigo-700': fromCurrency !== toCurrency && amount > 0,
            'bg-gray-400 cursor-not-allowed': fromCurrency === toCurrency || amount <= 0
          }"
            class="w-full text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Convert
        </button>
      </div>
    </form>

    <!-- Результат конвертации -->
    <div id="result" class="mt-6 text-center text-lg font-medium text-gray-800">
      Converted Amount: <span class="text-indigo-600 font-semibold">{{ convertedAmount.toFixed(2) }}</span>
    </div>
  </div>
</template>
