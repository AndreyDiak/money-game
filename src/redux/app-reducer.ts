import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";

const SET_INSTRUCTION_COMPLETED = 'SET_INSTRUCTION_COMPLETED'
const SET_TOKEN = 'auth/SET_TOKEN'
const SET_USER_ID = 'auth/SET_USER_ID'
const SET_READY = 'auth/SET_READY'
const STORAGE_NAME = 'STORAGE_NAME'

let initialState = {
  // пройдено ли обучение . . .
  isInstructionCompleted: false,
  isAuth: false,
  userId: null as null | string,
  token: null as null | string,
  ready: false
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
  setIsInstructionCompleted: () => ({type: SET_INSTRUCTION_COMPLETED} as const),
  setToken: (token: string | null) => ({type: SET_TOKEN, token} as const),
  setUserId: (userId: string | null) => ({type: SET_USER_ID, userId} as const),
  setReady: () => ({type: SET_READY} as const)
}

type AppActionsType = InferActionsType<typeof appActions>
type AppThunkType = ThunkAction<any, AppStateType, unknown, AppActionsType>

export const loginThunk = (jwtToken: string, id: string): AppThunkType => (dispatch) => {
  // добавляем в state токен и id . . .
  dispatch(appActions.setToken(jwtToken))
  dispatch(appActions.setUserId(id))

  // добавляем в localStorage данные о пользователе
  localStorage.setItem(STORAGE_NAME, JSON.stringify({
    userId: id, token: jwtToken
  }))

}

export const logoutThunk = (): AppThunkType => (dispatch) => {
  // убираем из state токен и id . . .
  dispatch(appActions.setToken(null))
  dispatch(appActions.setUserId(null))

  // удаляем из localStorage данные о пользователе
  localStorage.removeItem(STORAGE_NAME)
}


