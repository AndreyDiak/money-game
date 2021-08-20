import {AppStateType} from "./store";

export const getPersonSelector = (state: AppStateType) => {
  return state.profilePage.profile
}

export const getPersonsSelector = (state: AppStateType) => {
  return state.profilePage.persons
}