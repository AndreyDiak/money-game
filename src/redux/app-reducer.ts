import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {businessActions} from "./business-reducer";
import {realtyActions} from "./realty-reducer";
import {stocksActions} from "./stocks-reducer";
import {worksActions} from "./work-reducer";
import {actions} from "./game-reducer";
import {profileActions} from "./profile-reducer";
import {spendsActions} from "./spends-reducer";
import {newsActions} from "./news-reducer";

const SET_INSTRUCTION_COMPLETED = 'SET_INSTRUCTION_COMPLETED'
const SET_TOKEN = 'auth/SET_TOKEN'
const SET_USER_ID = 'auth/SET_USER_ID'
const SET_READY = 'auth/SET_READY'
const STORAGE_NAME = 'PROFILE_LOCAL_STORAGE'

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
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId
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

export const setCurrentGameThunk = (data: any): AppThunkType => (dispatch) => {
  console.log('//data of current game//')
  console.log(data)
  // инициализирование приложения . . .
  // @ts-ignore / мой бизнес . . .
  dispatch(businessActions.setMyBusinesses(data.myBusinesses))
  // @ts-ignore / моя недвижимость . . .
  dispatch(realtyActions.setMyRealty(data.myRealty))
  // @ts-ignore / акции . . .
  dispatch(stocksActions.setNewStocks(data.stocks, data.myStocks))
  // @ts-ignore / работа персонажа . . .
  dispatch(worksActions.setNewWork(data.workedDays, data.daysToUp, data.workLevel, data.workIncome))
  // @ts-ignore / состояние игры . . .
  dispatch(actions.setNewGame(data.day, data.dayInMonth, data.month, data.wallet, data.victoryBalance))
  // @ts-ignore / профиль . . .
  dispatch(profileActions.setNewProfile(data.startSalary, data.income, data.children, data.childrenCount, data.profile, data.tax))
  // @ts-ignore / траты персонажа . . .
  dispatch(spendsActions.setNewsSpends(data.spendsLevel, data.events, data.currentMonthPrice, data.currentMonthEvents, data.happenedEvents))
  // @ts-ignore
  dispatch(newsActions.setNewNews(data.news, data.newsIncome, data.newsExpenses))
}


