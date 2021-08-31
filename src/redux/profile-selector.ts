import {AppStateType} from "./store";

export const getPersonSelector = (state: AppStateType) => {
  return state.profilePage.profile
}

export const getPersonsSelector = (state: AppStateType) => {
  return state.profilePage.persons
}

export const getIncomeSelector = (state: AppStateType) => {
  return state.profilePage.profile?.salary
}

export const getTaxSelector = (state: AppStateType) => {
  return state.profilePage.tax
}

export const getExpensesSelector = (state: AppStateType) => {
  return state.profilePage.initialExpenses
}