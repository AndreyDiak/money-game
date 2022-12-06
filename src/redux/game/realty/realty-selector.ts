import { AppStateType } from "../../store";

export const getActiveRealtySelector = (state: AppStateType) =>
  state.realtyPage.activeRealty;

export const getIsAbleToShowNotificationSelector = (state: AppStateType) =>
  state.realtyPage.isAbleToShowNotification;
