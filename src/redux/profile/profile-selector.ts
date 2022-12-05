import { AppStateType } from "../store";

export const getPersonSelector = (state: AppStateType) =>
  state.profilePage.profile;

export const getPersonsSelector = (state: AppStateType) =>
  state.profilePage.persons;

export const getSalarySelector = (state: AppStateType) =>
  state.profilePage.profile?.salary;

export const getIncomeSelector = (state: AppStateType) =>
  state.profilePage.income;

export const getTaxSelector = (state: AppStateType) => state.profilePage.tax;

export const getExpensesSelector = (state: AppStateType) =>
  state.profilePage.profile?.expenses;
