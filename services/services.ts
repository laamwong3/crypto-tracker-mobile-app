import type { CoinDetails } from "../types";

export const getCryptoMarketData = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d";
  const response = await fetch(url);
  const data: CoinDetails[] = await response.json();
  return data;
};
