import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {profileActions} from "./profile-reducer";

const SET_DAYS_WORKED = 'workPage/SET_DAYS_WORKED'
const UP_WORK = 'workPage/UP_WORK'


// уровень работы . . .
const workLevel = [0, 1, 2, 3]
// кол-во дней до повышения . . .
const daysToUp = [5, 5, 5]
// увелечение зп
const workIncome = [0, 15, 20, 25]

let initialState = {
  // текущая работа игрока . . .
  workedDays: 0,
  daysToUp: daysToUp[0],
  workLevel: workLevel[0],
  workIncome: workIncome[0]
}

export type InitialWorkStateType = typeof initialState

export const worksReducer = (state = initialState, action: WorksActionsType): InitialWorkStateType => {
  switch (action.type) {
    case SET_DAYS_WORKED:
      return {
        ...state,
        daysToUp: state.daysToUp - 1,
        workedDays: state.workedDays + 1
      }
    case UP_WORK:
      return {
        ...state,
        workedDays: 0,
        workLevel: state.workLevel + 1,
        daysToUp: daysToUp[state.workLevel + 1],
        workIncome: workIncome[state.workLevel + 1]
      }
    default:
      return {
        ...state
      }
  }
}

export const worksActions = {
  setWorkedDays: () => ({type: SET_DAYS_WORKED}),
  upWork: () => ({type: UP_WORK})
}

export type WorkOptions = {
  level: WorkLevelType
  title: string
  income: WorkIncomeType
  daysToUp: WorkDaysToUpType
}
export type Work = {
  level: number
  daysWorked: number
  startSalary: number
  avatar: string
  options: WorkOptions[]
}

export type WorkLevelType = 'start' | 'middle' | 'pro' | 'senior'
export type WorkIncomeType = 0 | 15 | 20 | 25
export type WorkDaysToUpType = 125 | 200 | 250

type WorksActionsType = InferActionsType<typeof worksActions>
type WorkThunkType = ThunkAction<any, AppStateType, unknown, WorksActionsType>
export const upWorkThunk = (): WorkThunkType => (dispatch, getState) => {
  const salary = getState().profilePage.startSalary as number
  const prevWorkLevel = getState().worksPage.workLevel

  const newSalary = Math.round(salary + (salary * workIncome[prevWorkLevel + 1]) / 100)

  const newTax = newSalary >= 500
    ? Math.round(newSalary * 0.15)
    : Math.round(newSalary * 0.10)

  dispatch(worksActions.upWork())

  dispatch(profileActions.setSalary(newSalary))
  dispatch(profileActions.setTax(newTax))
}