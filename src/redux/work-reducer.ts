import {InferActionsType} from "./store";
import itAvatar from './../img/works/it.jpg'
import managerAvatar from './../img/works/manager.jpg'
import engineerAvatar from './../img/works/engineer.jpg'

const SET_WORK = 'work/SET_WORK'
const SET_SALARY = 'work/SET_SALARY'
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
  works: {
    it: {
      type: 'it' as WorksType,
      level: 1,
      daysWorked: 0,
      startSalary: 0,
      avatar: itAvatar,
      options: [
        {
          level: WorkLevel.start as WorkLevelType,
          title: 'Junior - разработчик',
          income: Income.start as WorkIncomeType,
          daysToUp: DaysToUp.start as WorkDaysToUpType
        }, {
          level: WorkLevel.middle as WorkLevelType,
          title: 'Middle - разработчик',
          income: Income.middle as WorkIncomeType,
          daysToUp: DaysToUp.middle as WorkDaysToUpType
        }, {
          level: WorkLevel.pro as WorkLevelType,
          title: 'Senior - разработчик',
          income: Income.pro as WorkIncomeType,
          daysToUp: DaysToUp.pro as WorkDaysToUpType
        }, {
          level: WorkLevel.senior as WorkLevelType,
          title: 'Тимлид',
          income: Income.pro as WorkIncomeType,
          daysToUp: DaysToUp.pro as WorkDaysToUpType
      }] as WorkOptions[]
    } as Work,
    manager: {
      type: 'manager' as WorksType,
      level: 1,
      daysWorked: 0,
      startSalary: 0,
      avatar: managerAvatar,
      options: [
        {
          level: WorkLevel.start as WorkLevelType,
          title: 'Помощник менеджера',
          income: Income.start as WorkIncomeType,
          daysToUp: DaysToUp.start as WorkDaysToUpType
        }, {
          level: WorkLevel.middle as WorkLevelType,
          title: 'Менеджер',
          income: Income.middle as WorkIncomeType,
          daysToUp: DaysToUp.middle as WorkDaysToUpType
        }, {
          level: WorkLevel.pro as WorkLevelType,
          title: 'Менеджер отдела',
          income: Income.pro as WorkIncomeType,
          daysToUp: DaysToUp.pro as WorkDaysToUpType
        }, {
          level: WorkLevel.senior as WorkLevelType,
          title: 'Старший менеджер',
          income: Income.pro as WorkIncomeType,
          daysToUp: DaysToUp.pro as WorkDaysToUpType
        }
      ] as WorkOptions[]
    } as Work,
    engineer: {
      type : 'engineer' as WorksType,
      level: 1,
      daysWorked: 0,
      startSalary: 0,
      avatar: engineerAvatar,
      options: [
        {
          level: WorkLevel.start as WorkLevelType,
          title: 'Младший инженер',
          income: Income.start as WorkIncomeType,
          daysToUp: DaysToUp.start as WorkDaysToUpType
        }, {
          level: WorkLevel.middle as WorkLevelType,
          title: 'Инженер проектировщик',
          income: Income.middle as WorkIncomeType,
          daysToUp: DaysToUp.middle as WorkDaysToUpType
        }, {
          level: WorkLevel.pro as WorkLevelType,
          title: 'Ведущий инженер',
          income: Income.pro as WorkIncomeType,
          daysToUp: DaysToUp.pro as WorkDaysToUpType
        }, {
          level: WorkLevel.senior as WorkLevelType,
          title: 'Руководитель отдела',
          income: Income.pro as WorkIncomeType,
          daysToUp: DaysToUp.pro as WorkDaysToUpType
        }
      ] as WorkOptions[]
    } as Work
  }
}

export type InitialWorkStateType = typeof initialState

export const worksReducer = (state = initialState, action: WorksActionsType): InitialWorkStateType => {
  switch (action.type) {
    case SET_WORK:
      return {
        ...state,
        currentWork: action.work,
      }
    case SET_SALARY:
      let worksCopy = {...state.works}
      worksCopy.it.startSalary = Number((Math.random() * 100 + 450).toFixed(0))
      worksCopy.manager.startSalary = Number((Math.random() * 100 + 420).toFixed(0))
      worksCopy.engineer.startSalary = Number((Math.random() * 100 + 470).toFixed(0))
      return {
        ...state,
        works: worksCopy
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
  setSalary: () => ({type: SET_SALARY} as const),
  setDaysWorked: (days: number) => ({type: SET_DAYS_WORKED, days} as const),
  setWorkLevel: (level: number) => ({type: SET_WORK_LEVEL, level} as const)

}

export type WorkOptions = {
  type: WorksType
  level: WorkLevelType
  title: string
  income: WorkIncomeType
  daysToUp: WorkDaysToUpType
}
export type Work = {
  type: WorksType
  level: number
  daysWorked: number
  startSalary: number
  avatar: string
  options: WorkOptions[]
}
export type WorksType = 'it' | 'manager' | 'engineer'
export type WorkLevelType = 'start' | 'middle' | 'pro' | 'senior'
export type WorkIncomeType = 0 | 15 | 20 | 25
export type WorkDaysToUpType = 125 | 200 | 250

type WorksActionsType = InferActionsType<typeof worksActions>

