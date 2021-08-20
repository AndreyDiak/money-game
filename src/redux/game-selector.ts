import {AppStateType} from "./store";

// day return
export const getDaySelector = (state: AppStateType) => {
  return state.gamePage.day
}
// wallet return
export const getWalletSelector = (state: AppStateType) => {
  return state.gamePage.wallet
}
// income return
export const getIncomeSelector = (state: AppStateType) => {
  return state.gamePage.income
}
// happenedEvents return
export const getHappenedEventsSelector = (state: AppStateType) => {
  return state.gamePage.happenedEvents
}
// businesses return
export const getBusinessesSelector = (state: AppStateType) => {
  return state.gamePage.businesses
}
// month return (current month)
export const getMonthSelector = (state: AppStateType) => {
  return state.gamePage.month
}
// months return (array of months)
export const getMonthsSelector = (state: AppStateType) => {
  return state.gamePage.months
}

export const getLevelSelector = (state: AppStateType) => {
  return state.gamePage.level
}

