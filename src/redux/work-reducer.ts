import {InferActionsType} from "./store";


const SET_WORK = 'work/SET_WORK'
const SET_DAYS_WORKED = 'work/SET_DAYS_WORKED'
const SET_WORK_LEVEL = 'work/SET_WORK_LEVEL'

// уровень работы . . .
export enum WorkLevel {
  start = 'start',
  middle = 'middle',
  pro = 'pro',
  senior = 'senior'
}
// кол-во дней до повышения . . .
export enum DaysToUp {
  start = 125,
  middle = 200,
  pro = 250
}
// увелечение зп
export enum Income {
  start = 0,
  middle = 15,
  pro = 20,
  senior = 25
}

let initialState = {
  // текущая работа игрока . . .
  currentWork: null as null | Work,

}

export type InitialWorkStateType = typeof initialState

export const worksReducer = (state = initialState, action: WorksActionsType): InitialWorkStateType => {
  switch (action.type) {
    case SET_WORK:
      return {
        ...state,
        currentWork: action.work,
      }
    case SET_DAYS_WORKED:
      return {
        ...state,
        currentWork: {
          ...state.currentWork,
          daysWorked: action.days
        } as Work
      }
    case SET_WORK_LEVEL:
      return {
        ...state,
        currentWork: {
          ...state.currentWork,
          level: action.level
        } as Work
      }
    default:
      return {
        ...state
      }
  }
}

export const worksActions = {
  setWork: (work: Work) => ({type: SET_WORK, work} as const),
  setDaysWorked: (days: number) => ({type: SET_DAYS_WORKED, days} as const),
  setWorkLevel: (level: number) => ({type: SET_WORK_LEVEL, level} as const)
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

