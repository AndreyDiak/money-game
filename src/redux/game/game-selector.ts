import { AppStateType } from "../store";

// day return
export const getDaySelector = (state: AppStateType) => state.gamePage.day;

export const getDayInMonthSelector = (state: AppStateType) =>
  state.gamePage.daysInMonth;

// wallet return
export const getWalletSelector = (state: AppStateType) => state.gamePage.wallet;

// TODO сделать чтобы ЗП хранилась здесь а не в profilePage reducer'e
// income return
// export const getIncomeSelector = (state: AppStateType) => state.gamePage.income;

// happenedEvents return
export const getHappenedEventsSelector = (state: AppStateType) =>
  state.spendsPage.happenedEvents;

// month (current month)
export const getMonthSelector = (state: AppStateType) => state.gamePage.month;

// months (array of months)
export const getMonthsSelector = (state: AppStateType) => state.gamePage.months;

// victoryBalance return
export const getVictoryBalance = (state: AppStateType) =>
  state.gamePage.victoryBalance;

// loseBalance return
export const getLoseBalance = (state: AppStateType) =>
  state.gamePage.loseBalance;

// player level return
export const getLevelSelector = (state: AppStateType) => state.gamePage.level;
