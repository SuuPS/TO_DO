export interface ExchangeRate {
    name: string;
    buy: string;
    sell: string;
}

export interface CombinedExchangeRate {
    name: string;
    averageBuy: string;
    averageSell: string;
    bestBuy: string;
    bestSell: string;
}

export interface Rate {
    organization_id: number;
    base_currency_id: number;
    created_at: string;
    updated_at: string;
    is_current: number;
    type: string;
    buy_usd: string | null;
    sell_usd: string | null;
    buy_eur: string | null;
    sell_eur: string | null;
    buy_rub: string | null;
    sell_rub: string | null;
    buy_kzt: string | null;
    sell_kzt: string | null;
    buy_uzs: string | null;
    sell_uzs: string | null;
    buy_cny: string | null;
    sell_cny: string | null;
    buy_gbp: string | null;
    sell_gbp: string | null;
    buy_try: string | null;
    sell_try: string | null;
}

export interface Bank {
    id: number;
    title: string;
    official_title: string;
    slug: string;
    website_url: string;
    rates: Rate[];
}

type BankResponse = Bank[];
