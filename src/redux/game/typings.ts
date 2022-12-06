import { popups, statuses } from "./models";
export interface HistoryType {
  title: string;
  price: number;
  operationType: "buy" | "sell";
  amount: number;
}
export type statusesType = statuses.LOSE | statuses.WIN | statuses.PROCESS;

export type PopupsType =
  | popups.STOCK
  | popups.MY_STOCK
  | popups.BROKER
  | popups.REALTY_BUY
  | popups.REALTY_SELL
  | popups.MARGIN
  | popups.HISTORY
  | popups.MARKET;
