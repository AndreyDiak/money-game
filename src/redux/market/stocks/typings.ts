import { conditions, filters } from "./models";

export type stockType = {
  title: string;
  count: number;
  risk: number;
  price: number[];
  condition: conditionType;
  priceChangeInterval: number;
  dividendsPercentage: number;
  dividendsAmount: number;
  maxPrice: number;
  minPrice: number;
};
export type BondType = {
  title: string;
  count: number;
  risk: number;
  price: number[];
  condition: conditionType;
  dividendsPercentage: number;
  dividendsAmount: number;
};
export type myStockType = {
  title: string;
  price: number;
  oldPrice: number;
  count: number;
  condition: conditionType;
  dividendsAmount: number;
};
export type brokerType = {
  name: string;
  age: number;
  commission: number;
  leverAgeMin: number;
  leverAgeMax: number;
  timeMin: number;
  timeMax: number;
  stocks: stockType[];
};
export type marginStockType = {
  expiresIn: number;
  count: number;
  startPrice: number;
};
// виды фильтров . . .
export type filterType =
  | filters.PRICE
  | filters.CONDITION
  | filters.TITLE
  | filters.COUNT
  | filters.NONE
  | filters.RISK
  | filters.DIVIDENDS;

export type conditionType = conditions.UP | conditions.DOWN;

export type MarginType = {
  type: "short" | "long"; // the type of margin
  expiresIn: number;
  commision: number;
  brokerName: string;
  penaltyPay: number;
  currentPenalty: number;
  giveBackData: {
    day: number;
    month: number;
  };
  stockTitle: string;
  stockPrice: number;
  stockCount: number;
};