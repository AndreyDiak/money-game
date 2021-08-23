import {AppStateType} from "./store";

export const getBusinessesSelector = ((state: AppStateType) => {
  return state.businessPage.businesses
})

export const getMyBusinessesSelector = ((state: AppStateType) => {
  return state.businessPage.myBusinesses
})