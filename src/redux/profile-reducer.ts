import {AppStateType, InferActionsType} from "./store"
import person1Photo from "../img/characters/person-1.png"
import person1Avatar from "../img/characters/person-1-avatar.png"
import person2Photo from "../img/characters/person-2.png"
import person2Avatar from "../img/characters/person-2-avatar.png"
import person3Photo from "../img/characters/person-3.png"
import person3Avatar from "../img/characters/person-3-avatar.png"
import person4Photo from "../img/characters/person-4.png"
import person4Avatar from "../img/characters/person-4-avatar.png"
import person5Photo from "../img/characters/person-5.png"
import person5Avatar from "../img/characters/person-5-avatar.png"
import person6Photo from "../img/characters/person-6.png"
import person6Avatar from "../img/characters/person-6-avatar.png"
import person7Photo from "../img/characters/person-7.png"
import person7Avatar from "../img/characters/person-7-avatar.png"
import person8Photo from "../img/characters/person-8.png"
import person8Avatar from "../img/characters/person-8-avatar.png"
import person9Photo from "../img/characters/person-9.png"
import person9Avatar from "../img/characters/person-9-avatar.png"
import person10Photo from "../img/characters/person-10.png"
import person10Avatar from "../img/characters/person-10-avatar.png"
import person11Photo from "../img/characters/person-11.png"
import person11Avatar from "../img/characters/person-11-avatar.png"
import person12Photo from "../img/characters/person-12.png"
import person12Avatar from "../img/characters/person-12-avatar.png"
import person13Photo from "../img/characters/person-13.png"
import person13Avatar from "../img/characters/person-13-avatar.png"
import person14Photo from "../img/characters/person-14.png"
import person14Avatar from "../img/characters/person-14-avatar.png"
import person15Photo from "../img/characters/person-15.png"
import person15Avatar from "../img/characters/person-15-avatar.png"
import {ThunkAction} from "redux-thunk";
import {actions} from "./game-reducer";

const SET_PROFILE = 'profilePage/SET_PROFILE'
const SET_TAX = 'profilePage/SET_TAX'
const SET_EXPENSES = 'profilePage/SET_EXPENSES'
const UPDATE_EXPENSES = 'profilePage/UPDATE_EXPENSES'
const PAY_FOR_EXPENSES = 'profilePage/PAY_FOR_EXPENSES'
const SET_CREDIT = 'profilePage/SET_CREDIT'

let initialState = {
  // список возможных персонажей . . .
  // виды расходов
  // дом / машина / кредитная карта / кредит
  // для каждого расходов есть своя фикс. сумма и % который надо выплачивать каждый месяц
  persons: [
    {
      name: 'Эдди',
      age: 28,
      saving: 320,
      salary: 700,
      work: 'Маркетолог',
      expenses: [
        {type: 'home', title: 'Дом', price: 4000, payment: 4},
        {type: 'car', title: 'Машина', price: 1500, payment: 5},
        {type: 'card', title: 'Кред. карта', price: 800, payment: 7},
        {type: 'credit', title: 'Кредит', price: 1200, payment: 5},
      ],
      img: person1Photo,
      avatar: person1Avatar,
    } as personType,
    {
      name: 'Макс',
      age: 24,
      saving: 360,
      salary: 650,
      work: 'Менеджер',
      expenses: [
        {type: 'home', title: 'Дом', price: 3000, payment: 4},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 1000, payment: 5},
        {type: 'credit', title: 'Кредит', price: 1700, payment: 7},
      ],
      img: person2Photo,
      avatar: person2Avatar
    } as personType,
    {
      name: 'Билл',
      age: 19,
      saving: 295,
      salary: 420,
      work: 'Разработчик',
      expenses: [
        {type: 'home', title: 'Дом', price: 1000, payment: 6},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 600, payment: 8},
        {type: 'credit', title: 'Кредит', price: 1000, payment: 6},
      ],
      img: person3Photo,
      avatar: person3Avatar
    } as personType,
    {
      name: 'Кейт',
      age: 23,
      saving: 420,
      salary: 530,
      work: 'Переводчик',
      expenses: [
        {type: 'home', title: 'Дом', price: 1400, payment: 6},
        {type: 'car', title: 'Машина', price: 2400, payment: 3},
        {type: 'card', title: 'Кред. карта', price: 600, payment: 8},
        {type: 'credit', title: 'Кредит', price: 600, payment: 8},
      ],
      img: person4Photo,
      avatar: person4Avatar
    } as personType,
    {
      name: 'Фред',
      age: 21,
      saving: 400,
      salary: 290,
      work: 'Кабельщик',
      expenses: [
        {type: 'home', title: 'Дом', price: 0, payment: 0},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 1500, payment: 3},
        {type: 'credit', title: 'Кредит', price: 1000, payment: 3},
      ],
      img: person5Photo,
      avatar: person5Avatar
    } as personType,
    {
      name: 'Джимми',
      age: 25,
      saving: 630,
      salary: 730,
      work: 'Режиссёр',
      expenses: [
        {type: 'home', title: 'Дом', price: 2000, payment: 15},
        {type: 'car', title: 'Машина', price: 800, payment: 5},
        {type: 'card', title: 'Кред. карта', price: 700, payment: 10},
        {type: 'credit', title: 'Кредит', price: 0, payment: 5},
      ],
      img: person6Photo,
      avatar: person6Avatar
    } as personType,
    {
      name: 'Брэд',
      age: 31,
      saving: 490,
      salary: 570,
      work: 'Страховщик',
      expenses: [
        {type: 'home', title: 'Дом', price: 1200, payment: 10},
        {type: 'car', title: 'Машина', price: 800, payment: 7},
        {type: 'card', title: 'Кред. карта', price: 1000, payment: 8},
        {type: 'credit', title: 'Кредит', price: 0, payment: 0},
      ],
      img: person7Photo,
      avatar: person7Avatar
    } as personType,
    {
      name: 'Лизи',
      age: 26,
      saving: 510,
      salary: 550,
      work: 'Бухгалтер',
      expenses: [
        {type: 'home', title: 'Дом', price: 1000, payment: 9},
        {type: 'car', title: 'Машина', price: 1200, payment: 7},
        {type: 'card', title: 'Кред. карта', price: 900, payment: 8},
        {type: 'credit', title: 'Кредит', price: 0, payment: 0},
      ],
      img: person8Photo,
      avatar: person8Avatar
    } as personType,
    {
      name: 'Изабель',
      age: 18,
      saving: 900,
      salary: 480,
      work: 'Танцовщица',
      expenses: [
        {type: 'home', title: 'Дом', price: 400, payment: 10},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 500, payment: 10},
        {type: 'credit', title: 'Кредит', price: 1000, payment: 10},
      ],
      img: person9Photo,
      avatar: person9Avatar
    } as personType,
    {
      name: 'Фрэнк',
      age: 29,
      saving: 330,
      salary: 620,
      work: 'Продюсер',
      expenses: [
        {type: 'home', title: 'Дом', price: 1200, payment: 15},
        {type: 'car', title: 'Машина', price: 1000, payment: 10},
        {type: 'card', title: 'Кред. карта', price: 0, payment: 0},
        {type: 'credit', title: 'Кредит', price: 700, payment: 5},
      ],
      img: person10Photo,
      avatar: person10Avatar
    } as personType,
    {
      name: 'Алекс',
      age: 28,
      saving: 330,
      salary: 300,
      work: 'Журналист',
      expenses: [
        {type: 'home', title: 'Дом', price: 800, payment: 6},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 550, payment: 8},
        {type: 'credit', title: 'Кредит', price: 0, payment: 0},
      ],
      img: person11Photo,
      avatar: person11Avatar
    } as personType,
    {
      name: 'Адам',
      age: 28,
      saving: 330,
      salary: 580,
      work: 'Имиджмейкер',
      expenses: [
        {type: 'home', title: 'Дом', price: 1000, payment: 15},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 0, payment: 0},
        {type: 'credit', title: 'Кредит', price: 800, payment: 10},
      ],
      img: person12Photo,
      avatar: person12Avatar
    } as personType,
    {
      name: 'Хейли',
      age: 27,
      saving: 330,
      salary: 330,
      work: 'Учитель',
      expenses: [
        {type: 'home', title: 'Дом', price: 1500, payment: 5},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 1000, payment: 8},
        {type: 'credit', title: 'Кредит', price: 0, payment: 0},
      ],
      img: person13Photo,
      avatar: person13Avatar
    } as personType,
    {
      name: 'Лили',
      age: 26,
      saving: 330,
      salary: 370,
      work: 'Врач',
      expenses: [
        {type: 'home', title: 'Дом', price: 700, payment: 5},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 1000, payment: 4},
        {type: 'credit', title: 'Кредит', price: 600, payment: 8},
      ],
      img: person14Photo,
      avatar: person14Avatar
    } as personType,
    {
      name: 'Боб',
      age: 23,
      saving: 330,
      salary: 590,
      work: 'Инженер',
      expenses: [
        {type: 'home', title: 'Дом', price: 1500, payment: 10},
        {type: 'car', title: 'Машина', price: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', price: 1000, payment: 7},
        {type: 'credit', title: 'Кредит', price: 200, payment: 10},
      ],
      img: person15Photo,
      avatar: person15Avatar
    } as personType,
  ],
  // наш профиль . . .
  profile: null as null | personType, // профиль персонажа
  tax: 0, // налог с зп
  initialExpenses: [] as expenseType[]
}

export type InitialProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileActionsType): InitialProfileStateType => {
  switch (action.type) {
    // установка профиля игрока
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    // подоходный налог
    case SET_TAX:
      return {
        ...state,
        tax: action.tax
      }
    // ставим константные значения долгов персонажа
    case SET_EXPENSES:
      return {
        ...state,
        initialExpenses: action.expenses
      }
    // ежемесячные выплаты по долгам
    case UPDATE_EXPENSES:

      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: state.profile?.expenses.map((expense, index) => {
            return {
              ...expense,
              // если долг > 0 то мы выплачиваем его
              price: expense.price > 0
                // если ежемесячная плата больше чем оставшийся долг, то мы выплачиваем тока нужную часть
                ? expense.price < state.initialExpenses[index].price * expense.payment / 100
                  ? expense.price === 0
                  : expense.price -  state.initialExpenses[index].price * expense.payment / 100
                : 0
            }
          }) as expenseType[]
        } as personType
      }
    // пользователь выплачивает свой кредит
    case PAY_FOR_EXPENSES:
      return {
        ...state,
        profile: action.profile
      }
    case SET_CREDIT:
      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: action.expenses
        } as personType,
        initialExpenses: state.initialExpenses.map(expense => {
          if (expense.type === 'credit') {
            return action.expenses[3]
          }
          return expense
        })
      }
    default:
      return {
        ...state
      }
  }
}

export const profileActions = {
  setProfile: (profile: personType) => ({type: SET_PROFILE, profile} as const),
  setTax: (tax: number) => ({type: SET_TAX, tax} as const),
  setExpenses: (expenses: expenseType[]) => ({type: SET_EXPENSES, expenses} as const),
  updateExpenses: () => ({type: UPDATE_EXPENSES} as const),
  payForExpenses: (profile: personType) => ({type: PAY_FOR_EXPENSES, profile} as const),
  setCredit: (expenses: expenseType[]) => ({type: SET_CREDIT, expenses} as const)

}

type ProfileActionsType = InferActionsType<typeof profileActions>
export type expenseType = {
  type: string
  title: string
  price: number
  payment: number
}
export type personType = {
  name: string
  age: number
  saving: number
  salary: number
  img: string
  avatar: string
  work: string
  expenses: expenseType[]
}
type ProfileThunkType = ThunkAction<any, AppStateType, unknown, ProfileActionsType>

export const payForExpensesThunk = (price: number, expenseType: string): ProfileThunkType => (dispatch, getState) => {
  // price / сумма к погашению долга
  // expenseType / долг, который гасит пользователь
  let profileCopy = getState().profilePage.profile as personType
  // находим нужный нам долг и режим его на сумму выплаты банку
  profileCopy.expenses.forEach((expense, index) => {
    if (expense.type === expenseType) {
      profileCopy.expenses[index].price = expense.price - price
    }
  })
  dispatch(profileActions.payForExpenses(profileCopy))
  // @ts-ignore / уменошаем баланс пользователя
  dispatch(actions.updateWalletFromSpends(price))
}

export const takeCreditThunk = (creditAmount: number, payoutPercentage: number, finalPayout: number): ProfileThunkType => (dispatch, getState) => {
  // creditAmount / размер кредита
  // payoutPercentage / месячный процент
  // finalPayout / размер возврата
  // @ts-ignore
  let expensesCopy = [...getState().profilePage.profile?.expenses] as expenseType[]

  expensesCopy[3] = {
    ...expensesCopy[3],
    price: finalPayout,
    payment: payoutPercentage
  }

  dispatch(profileActions.setCredit(expensesCopy))

  // @ts-ignore
  dispatch(actions.updateWalletFromSpends(-creditAmount))

}