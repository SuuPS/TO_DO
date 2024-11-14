import {defineStore, storeToRefs} from 'pinia';
import { computed, ref, watch } from 'vue';
import exchangeService from "@/services/exchangeService.ts";
import exchangeHelpers from "@/utils/exchangeHelper.ts";
import {ExchangeRate, Bank} from "@/store/exchange/exchangeTypes.ts";

export const useExchangeStore = defineStore('exchange', () => {

    const averageExchangeRates = ref<ExchangeRate[]>([]);

    const averageExchangeRatesList = computed(() => {
        return averageExchangeRates.value;
    });

    const bestExchangeRates = ref<ExchangeRate[]>([]);

    const bestExchangeRatesList = computed(() => {
        return bestExchangeRates.value;
    });

    const banksExchangeRates = ref<Bank[]>([]);

    const banksExchangeRatesList = computed(() => {
        return banksExchangeRates.value;
    });

    const fetchAverageExchangeRates = async () => {
        try {
            const response = await exchangeService.getAverageExchangeRates()
            averageExchangeRates.value = exchangeHelpers.transformExchangeRates(response.data)
        } catch (err) {
            console.log(err, 'error')
        }
    }

    const fetchBestExchangeRates = async () => {
        try {
            const response = await exchangeService.getBestExchangeRates()
            bestExchangeRates.value = exchangeHelpers.transformExchangeRates(response.data)
        } catch (err) {
            console.log(err, 'error')
        }
    }

    const fetchBanksExchangeRates = async () => {
        try {
            const response = await exchangeService.getCurrentRatesBanks()
            banksExchangeRates.value = response.data
        } catch (err) {
        }
    }

    const useUpdatedExchangeRates = () => {
        const { averageExchangeRatesList } = storeToRefs(useExchangeStore());
        const updatedExchangeRatesList = ref<{ name: string; buy: string; sell: string }[]>([]);

        watch(averageExchangeRatesList, (newRates) => {
            updatedExchangeRatesList.value = [
                ...newRates,
                { name: "som", buy: "1", sell: "1" }, // Добавляем объект для сома
            ];
        }, { immediate: true });

        return updatedExchangeRatesList;
    };

    return {
        averageExchangeRatesList,
        bestExchangeRatesList,
        banksExchangeRatesList,
        fetchAverageExchangeRates,
        fetchBestExchangeRates,
        fetchBanksExchangeRates,
        useUpdatedExchangeRates
    };
});
