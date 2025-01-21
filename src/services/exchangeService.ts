import api from "@/http/index.ts";

const getAverageExchangeRates = async () => {
    return await api.get(`average`);
}

const getBestExchangeRates = async () => {
    return await api.get(`best`);
}

const getCurrentRatesBanks = async () => {
    return await api.get(`current`);
}

export default {
    getAverageExchangeRates,
    getBestExchangeRates,
    getCurrentRatesBanks
}