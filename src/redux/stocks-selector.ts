// stocks return
import {AppStateType} from "./store";

export const getStocksSelector = (state: AppStateType) => {
  return state.stocksPage.stocks
}
// myStocks return
export const getMyStocksSelector = (state: AppStateType) => {
  return state.stocksPage.myStocks
}