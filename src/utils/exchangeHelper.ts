import { ExchangeRate, CombinedExchangeRate } from "@/store/exchange/exchangeTypes.ts";

// Функция для преобразования курсов
const transformExchangeRates = (data: { [key: string]: string }): ExchangeRate[] => {
    const currencyKeys = ['usd', 'eur', 'rub', 'kzt'];  // Список валют
    const result = currencyKeys.map(currency => ({
        name: currency,
        buy: data[`buy_${currency}`],
        sell: data[`sell_${currency}`]
    }));
    return result;
};

// Функция для объединения средних и лучших курсов
const mergeExchangeRates = (averageRates: ExchangeRate[], bestRates: ExchangeRate[]): CombinedExchangeRate[] => {
    return averageRates.map(average => {
        // Находим соответствующий курс в массиве лучших курсов
        const best = bestRates.find(rate => rate.name === average.name);

        if (best) {
            return {
                name: average.name,
                averageBuy: average.buy,
                averageSell: average.sell,
                bestBuy: best.buy,
                bestSell: best.sell
            };
        } else {
            return {
                name: average.name,
                averageBuy: average.buy,
                averageSell: average.sell,
                bestBuy: "N/A", // Если для валюты нет лучшего курса
                bestSell: "N/A" // Если для валюты нет лучшего курса
            };
        }
    });
}

export const convertCurrency = (
    fromRate: { name: string; buy: string; sell: string },
    toRate: { name: string; buy: string; sell: string },
    amount: number
) => {
    if (fromRate && toRate && amount > 0) {
        if (fromRate.name === toRate.name) {
            // Если валюта исходная и целевая одинаковые, используем курс продажи и покупки для расчета
            const exchangeRate = fromRate.sell / toRate.buy;
            return amount * exchangeRate;
        } else {
            // Преобразуем валюту через сом (основная валюта)
            const baseToFrom = 1 / fromRate.sell; // Переводим из исходной валюты в сом
            const baseToTo = toRate.buy; // Переводим из сома в целевую валюту

            // Вычисляем результат
            return amount * baseToFrom * baseToTo;
        }
    }
    return 0; // Если нет курсов или введена неверная сумма
};

export const currencyNames: Record<string, string> = {
    usd: "US Dollar",
    eur: "Euro",
    rub: "Russian Ruble",
    kzt: "Kazakhstani Tenge",
    som: "Kyrgyz Som", // Добавляем сом
};

export const getCurrencyName = (currencyCode: string) => {
    return currencyNames[currencyCode] || "";
};

export default {
    transformExchangeRates,
    mergeExchangeRates,
    convertCurrency,
}