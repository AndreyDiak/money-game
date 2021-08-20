import {InferActionsType} from "./store";

const SET_TIME_SPEED = 'settingsPage/SET_TIME_SPEED'
const SET_DIFFICULTY = 'settingsPage/SET_DIFFICULTY'
const SET_CONST_TIME_SPEED = 'settingsPage/SET_CONST_TIME_SPEED'

let initialState = {
  // скорость игры . . .
  timeSpeed: 4,
  // константа времени . . .
  constTimeSpeed: 4,
  // сложность игры . . .
  difficulty: 'легко' as DifficultyType
}

export type InitialSettingsStateType = typeof initialState

export const settingsReducer = (state = initialState, action: ProfileActionsType): InitialSettingsStateType => {
  switch (action.type) {
    case SET_TIME_SPEED:
      return {
        ...state,
        timeSpeed: action.timeSpeed
      }
    case SET_CONST_TIME_SPEED:
      return {
        ...state,
        constTimeSpeed: action.constTimeSpeed
      }
    case SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.difficulty
      }
    default:
      return {
        ...state
      }
  }
}

export const settingsActions = {
  setTimeSpeed: (timeSpeed: number) => ({type: SET_TIME_SPEED, timeSpeed} as const),
  setConstTimeSpeed: (constTimeSpeed: number) => ({type: SET_CONST_TIME_SPEED, constTimeSpeed} as const),
  setDifficulty: (difficulty: DifficultyType) => ({type: SET_DIFFICULTY, difficulty} as const),
}

export type DifficultyType = 'легко' | 'средне' | 'сложно'

type ProfileActionsType = InferActionsType<typeof settingsActions>

