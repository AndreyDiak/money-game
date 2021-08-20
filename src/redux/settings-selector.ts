import {AppStateType} from "./store";

// timeSpeed return
export const getTimeSpeedSelector = (state: AppStateType) => {
  return state.settingsPage.timeSpeed
}

export const getDifficultySelector = (state: AppStateType) => {
  return state.settingsPage.difficulty
}

export const getConstTimeSpeedSelector = (state: AppStateType) => {
  return state.settingsPage.constTimeSpeed
}