import { AppStateType } from "./../../store";
import { useCallback } from "react";
export const getActiveRealtySelector = useCallback(
  (state: AppStateType) => state.realtyPage.activeRealty,
  []
);
