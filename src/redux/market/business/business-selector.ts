import { AppStateType } from "../../store";

export const getBusinessesSelector = (state: AppStateType) =>
  state.businessPage.businesses;

export const getMyBusinessesSelector = (state: AppStateType) =>
  state.businessPage.myBusinesses;

export const getIsAbleToShowNotificationSelector = (state: AppStateType) =>
  state.businessPage.isAbleToShowNotification;
