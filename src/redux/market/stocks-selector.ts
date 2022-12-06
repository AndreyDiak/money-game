// stocks
import { AppStateType } from "../store";

export const getStocksSelector = (state: AppStateType) =>
  state.stocksPage.stocks;

export const getFilteredStocksSelector = (state: AppStateType) =>
  state.stocksPage.filteredStocks;

// myStocks
export const getMyStocksSelector = (state: AppStateType) =>
  state.stocksPage.myStocks;

export const getBondsSelector = (state: AppStateType) => state.stocksPage.bonds;

export const getBrokersSelector = (state: AppStateType) =>
  state.stocksPage.brokers;
