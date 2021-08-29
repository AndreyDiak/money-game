import {AppStateType} from "./store";

// day return
export const getDaySelector = (state: AppStateType) => {
  return state.gamePage.day
}
export const getDayInMonthSelector = (state: AppStateType) => {
  return state.gamePage.daysInMonth
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
  return state.spendsPage.happenedEvents
}
// month return (current month)
export const getMonthSelector = (state: AppStateType) => {
  return state.gamePage.month
}
// months return (array of months)
export const getMonthsSelector = (state: AppStateType) => {
  return state.gamePage.months
}
// victoryBalance return
export const getVictoryBalance = (state: AppStateType) => {
  return state.gamePage.victoryBalance
}
// loseBalance return
export const getLoseBalance = (state: AppStateType) => {
  return state.gamePage.loseBalance
}
// player level return
export const getLevelSelector = (state: AppStateType) => {
  return state.gamePage.level
}

