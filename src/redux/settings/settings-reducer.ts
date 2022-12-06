import { difficultiesType, timeSpeedType } from "./typings";
import { defaultDiffilculty, defaultTimeSpeed, timeSpeed } from "./models";
import { InferActionsType } from "../store";

const SET_TIME_SPEED = "settingsPage/SET_TIME_SPEED";
const SET_DIFFICULTY = "settingsPage/SET_DIFFICULTY";
const SET_CONST_TIME_SPEED = "settingsPage/SET_CONST_TIME_SPEED";

let initialState = {
  // скорость игры . . .
  timeSpeed: defaultTimeSpeed,
  // константа времени . . .
  constTimeSpeed: defaultTimeSpeed,
  // сложность игры . . .
  difficulty: defaultDiffilculty,
};

export type InitialSettingsStateType = typeof initialState;

export const settingsReducer = (
  state = initialState,
  action: SettingsActionType
): InitialSettingsStateType => {
  switch (action.type) {
    case SET_TIME_SPEED:
      return {
        ...state,
        timeSpeed: !!action.time ? action.time : state.constTimeSpeed,
      };
    case SET_CONST_TIME_SPEED:
      return {
        ...state,
        constTimeSpeed: action.constTimeSpeed,
      };
    case SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.difficulty,
      };
    default:
      return {
        ...state,
      };
  }
};

export const settingsActions = {
  setTimeSpeed: (time?: timeSpeedType) =>
    ({ type: SET_TIME_SPEED, time } as const),
  setConstTimeSpeed: (constTimeSpeed: timeSpeedType) =>
    ({ type: SET_CONST_TIME_SPEED, constTimeSpeed } as const),
  setDifficulty: (difficulty: difficultiesType) =>
    ({ type: SET_DIFFICULTY, difficulty } as const),
};

export type SettingsActionType = InferActionsType<typeof settingsActions>;
