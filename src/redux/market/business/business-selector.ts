import { AppStateType } from "../../store";

export const getBusinessesSelector = (state: AppStateType) =>
  state.businessPage.businesses;

export const getMyBusinessesSelector = (state: AppStateType) =>
  state.businessPage.myBusinesses;

export const getIsAbleToGenerateBusinessSelector = (state: AppStateType) =>
  state.businessPage.isAbleToGenerateBusiness;
