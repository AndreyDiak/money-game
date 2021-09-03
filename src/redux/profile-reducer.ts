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
import {myStockType} from "./stocks-reducer";

const SET_PROFILE = 'profilePage/SET_PROFILE'
const SET_TAX = 'profilePage/SET_TAX'
// const SET_EXPENSES = 'profilePage/SET_EXPENSES'
const UPDATE_EXPENSES = 'profilePage/UPDATE_EXPENSES'
const PAY_FOR_EXPENSES = 'profilePage/PAY_FOR_EXPENSES'
const SET_CREDIT = 'profilePage/SET_CREDIT'
const UPDATE_INCOME = 'profilePage/UPDATE_INCOME'
const SET_SALARY = 'profilePage/SET_SALARY'

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
        {type: 'home', title: 'Дом', remainPrice: 4000, startPrice: 4000, payment: 4},
        {type: 'car', title: 'Машина', remainPrice: 1500, startPrice: 1500, payment: 5},
        {type: 'card', title: 'Кред. карта', remainPrice: 800, startPrice: 800, payment: 7},
        {type: 'credit', title: 'Кредит', remainPrice: 1200, startPrice: 1200, payment: 5},
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
        {type: 'home', title: 'Дом', remainPrice: 3000, startPrice: 3000, payment: 4},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice:0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 5},
        {type: 'credit', title: 'Кредит', remainPrice: 1700, startPrice: 1700, payment: 7},
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
        {type: 'home', title: 'Дом', remainPrice: 1000, startPrice: 1000, payment: 6},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 600, startPrice: 600, payment: 8},
        {type: 'credit', title: 'Кредит', remainPrice: 1000, startPrice: 1000, payment: 6},
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
        {type: 'home', title: 'Дом', remainPrice: 1400, startPrice: 1400, payment: 6},
        {type: 'car', title: 'Машина', remainPrice: 2400, startPrice: 2400, payment: 3},
        {type: 'card', title: 'Кред. карта', remainPrice: 600, startPrice: 600, payment: 8},
        {type: 'credit', title: 'Кредит', remainPrice: 600, startPrice: 600, payment: 8},
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
        {type: 'home', title: 'Дом', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1500, startPrice: 1500, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 1000, startPrice: 1000, payment: 3},
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
        {type: 'home', title: 'Дом', remainPrice: 2000, startPrice: 2000, payment: 15},
        {type: 'car', title: 'Машина', remainPrice: 800, startPrice: 800, payment: 5},
        {type: 'card', title: 'Кред. карта', remainPrice: 700, startPrice: 700, payment: 10},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 5},
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
        {type: 'home', title: 'Дом', remainPrice: 1200, startPrice: 1200, payment: 10},
        {type: 'car', title: 'Машина', remainPrice: 800, startPrice: 800, payment: 7},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 8},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
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
        {type: 'home', title: 'Дом', remainPrice: 1000, startPrice: 1000, payment: 9},
        {type: 'car', title: 'Машина', remainPrice: 1200, startPrice: 1200, payment: 7},
        {type: 'card', title: 'Кред. карта', remainPrice: 900, startPrice: 900, payment: 8},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
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
        {type: 'home', title: 'Дом', remainPrice: 400, startPrice: 400, payment: 10},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 500, startPrice: 500, payment: 10},
        {type: 'credit', title: 'Кредит', remainPrice: 1000, startPrice: 1000, payment: 10},
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
        {type: 'home', title: 'Дом', remainPrice: 1200, startPrice: 1200, payment: 15},
        {type: 'car', title: 'Машина', remainPrice: 1000, startPrice: 1000, payment: 10},
        {type: 'card', title: 'Кред. карта', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'credit', title: 'Кредит', remainPrice: 700, startPrice: 700, payment: 5},
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
        {type: 'home', title: 'Дом', remainPrice: 800, startPrice: 800, payment: 6},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 550, startPrice: 550, payment: 8},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
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
        {type: 'home', title: 'Дом', remainPrice: 1000, startPrice: 1000, payment: 15},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'credit', title: 'Кредит', remainPrice: 800, startPrice: 800, payment: 10},
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
        {type: 'home', title: 'Дом', remainPrice: 1500, startPrice: 1500, payment: 5},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 8},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
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
        {type: 'home', title: 'Дом', remainPrice: 700, startPrice: 700, payment: 5},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 4},
        {type: 'credit', title: 'Кредит', remainPrice: 600, startPrice: 600, payment: 8},
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
        {type: 'home', title: 'Дом', remainPrice: 1500, startPrice: 1500, payment: 10},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 7},
        {type: 'credit', title: 'Кредит', remainPrice: 200, startPrice: 200, payment: 10},
      ],
      img: person15Photo,
      avatar: person15Avatar
    } as personType,
  ],
  // наш профиль . . .
  profile: null as null | personType, // профиль персонажа
  startSalary: 0, // начальная зп
  tax: 0, // налог с зп
  // initialExpenses: [] as expenseType[],
  income: 0
}

export type InitialProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileActionsType): InitialProfileStateType => {
  switch (action.type) {
    // установка профиля игрока
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
        startSalary: action.profile.salary
      }
    // подоходный налог
    case SET_TAX:
      return {
        ...state,
        tax: action.tax
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
              remainPrice: expense.remainPrice > 0
                // если ежемесячная плата больше чем оставшийся долг, то мы выплачиваем тока нужную часть
                ? expense.remainPrice < expense.startPrice * expense.payment / 100
                  ? expense.remainPrice === 0
                  : expense.remainPrice -  expense.startPrice * expense.payment / 100
                : 0
            }
          })
        } as personType
      }
    // пользователь выплачивает свой кредит
    case PAY_FOR_EXPENSES:
      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: action.expenses
        } as personType,
      }
    // добавляем кредитные данные в профиль персонажа
    case SET_CREDIT:
      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: state.profile?.expenses.map(expense => {
            if (expense.type === 'credit') {
              return action.expenses[3]
            }
            return expense
          })
        } as personType
      }
    // обновляем доход персонажа
    case UPDATE_INCOME:
      // здесь мы будем собирать все возможные пассивные доходы персонажа и суммировать
      return {
        ...state,
        // @ts-ignore
        income: action.newIncome
      }
    // обновляем зарплату персонажа
    case SET_SALARY:
      return {
        ...state,
        profile: {
          ...state.profile,
          salary: action.newSalary
        } as personType
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
  // setExpenses: (expenses: expenseType[]) => ({type: SET_EXPENSES, expenses} as const),
  updateExpenses: () => ({type: UPDATE_EXPENSES} as const),
  payForExpenses: (expenses: expenseType[]) => ({type: PAY_FOR_EXPENSES, expenses} as const),
  setCredit: (expenses: expenseType[]) => ({type: SET_CREDIT, expenses} as const),
  updateIncome: (newIncome: number) => ({type: UPDATE_INCOME, newIncome} as const),
  setSalary: (newSalary: number) => ({type: SET_SALARY, newSalary} as const)
}

type ProfileActionsType = InferActionsType<typeof profileActions>
export type expenseType = {
  type: string
  title: string
  remainPrice: number
  startPrice: number
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

  // @ts-ignore
  let expensesCopy = [...getState().profilePage.profile?.expenses] as expenseType[]
  // находим нужный нам долг и режим его на сумму выплаты банку
  expensesCopy.forEach((expense, index) => {
    if (expense.type === expenseType) {
      expensesCopy[index].remainPrice = expense.remainPrice - price
    }
  })
  dispatch(profileActions.payForExpenses(expensesCopy))
  // @ts-ignore / уменошаем баланс пользователя
  dispatch(actions.updateWalletFromSpends(price))

  dispatch(updateIncome())
}
export const takeCreditThunk = (creditAmount: number, payoutPercentage: number, finalPayout: number): ProfileThunkType => (dispatch, getState) => {
  // creditAmount / размер кредита
  // payoutPercentage / месячный процент
  // finalPayout / размер возврата
  // @ts-ignore
  let expensesCopy = [...getState().profilePage.profile?.expenses] as expenseType[]
  expensesCopy[3] = {
    ...expensesCopy[3],
    remainPrice: finalPayout,
    startPrice: finalPayout,
    payment: payoutPercentage
  }

  dispatch(profileActions.setCredit(expensesCopy))

  // @ts-ignore
  dispatch(actions.updateWalletFromSpends(-creditAmount))

  dispatch(updateIncome())
}
export const updateIncome = (): ProfileThunkType => (dispatch, getState) => {

  const profilePage = getState().profilePage
  const tax = profilePage.tax
  const salary = profilePage.profile?.salary as number

  // начисления с девидендов
  const myStocks = getState().stocksPage.myStocks as myStockType[]
  let dividendsSummary = 0

  myStocks.forEach(stock => {
    dividendsSummary += stock.dividendsAmount * stock.count
  })

  let expensesSummary = 0
  profilePage.profile?.expenses.map((expense, index) => {
    if (profilePage.profile?.expenses[index].remainPrice !== 0) {
      expensesSummary += expense.startPrice * expense.payment / 100
    }
  })

  // @ts-ignore
  let NewIncome = Math.round(salary - tax - expensesSummary + dividendsSummary)

  dispatch(profileActions.updateIncome(NewIncome))
  // dispatch(profileActions.setSalary(salary + workAdd))
  // dispatch(profileActions.setTax(newTax))
}