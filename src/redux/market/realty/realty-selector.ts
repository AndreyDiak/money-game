import { AppStateType } from "./../../store";

export const getActiveRealtySelector = (state: AppStateType) =>
  state.realtyPage.activeRealty;

export const getIsAbleToGenerateRealtySelector = (state: AppStateType) =>
  state.realtyPage.isAbleToGenerateRealty;
