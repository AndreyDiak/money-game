import {InferActionsType} from "./store";

const SET_INSTRUCTION_COMPLETED = 'SET_INSTRUCTION_COMPLETED'

let initialState = {
  // пройдено ли обучение . . .
  isInstructionCompleted: false,
}

export type InitialAppStateType = typeof initialState

export const appReducer = (state = initialState, action: AppActionsType): InitialAppStateType => {
  switch (action.type) {
    case SET_INSTRUCTION_COMPLETED:
      return {
        ...state,
        isInstructionCompleted: true
      }
    default:
      return state
  }
}

export const appActions = {
  setIsInstructionCompleted: () => ({type: SET_INSTRUCTION_COMPLETED} as const)
}

type AppActionsType = InferActionsType<typeof appActions>

