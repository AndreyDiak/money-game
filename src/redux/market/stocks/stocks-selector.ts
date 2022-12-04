// stocks return
import {AppStateType} from "../../store";

export const getStocksSelector = (state: AppStateType) => {
  return state.stocksPage.stocks
}
// myStocks return
export const getMyStocksSelector = (state: AppStateType) => {
  return state.stocksPage.myStocks
}

export const getBondsSelector = (state: AppStateType) => {
  return state.stocksPage.bonds
}

export const getBrokersSelector = (state: AppStateType) => {
  return state.stocksPage.brokers
}