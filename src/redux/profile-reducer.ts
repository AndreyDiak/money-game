import { ThunkAction } from "redux-thunk"
import person1Avatar from "../img/characters/person-1-avatar.png"
import person1Photo from "../img/characters/person-1.png"
import person10Avatar from "../img/characters/person-10-avatar.png"
import person10Photo from "../img/characters/person-10.png"
import person11Avatar from "../img/characters/person-11-avatar.png"
import person11Photo from "../img/characters/person-11.png"
import person12Avatar from "../img/characters/person-12-avatar.png"
import person12Photo from "../img/characters/person-12.png"
import person13Avatar from "../img/characters/person-13-avatar.png"
import person13Photo from "../img/characters/person-13.png"
import person14Avatar from "../img/characters/person-14-avatar.png"
import person14Photo from "../img/characters/person-14.png"
import person15Avatar from "../img/characters/person-15-avatar.png"
import person15Photo from "../img/characters/person-15.png"
import person16Avatar from "../img/characters/person-16-avatar.png"
import person16Photo from "../img/characters/person-16.png"
import person2Avatar from "../img/characters/person-2-avatar.png"
import person2Photo from "../img/characters/person-2.png"
import person3Avatar from "../img/characters/person-3-avatar.png"
import person3Photo from "../img/characters/person-3.png"
import person4Avatar from "../img/characters/person-4-avatar.png"
import person4Photo from "../img/characters/person-4.png"
import person5Avatar from "../img/characters/person-5-avatar.png"
import person5Photo from "../img/characters/person-5.png"
import person6Avatar from "../img/characters/person-6-avatar.png"
import person6Photo from "../img/characters/person-6.png"
import person7Avatar from "../img/characters/person-7-avatar.png"
import person7Photo from "../img/characters/person-7.png"
import person8Avatar from "../img/characters/person-8-avatar.png"
import person8Photo from "../img/characters/person-8.png"
import person9Avatar from "../img/characters/person-9-avatar.png"
import person9Photo from "../img/characters/person-9.png"
import { actions } from "./game-reducer"
import { AppStateType, InferActionsType } from "./store"

const SET_PROFILE = 'profilePage/SET_PROFILE'
const SET_TAX = 'profilePage/SET_TAX'
// const SET_EXPENSES = 'profilePage/SET_EXPENSES'
const UPDATE_EXPENSES = 'profilePage/UPDATE_EXPENSES'
const PAY_FOR_EXPENSES = 'profilePage/PAY_FOR_EXPENSES'
const SET_CREDIT = 'profilePage/SET_CREDIT'
const UPDATE_INCOME = 'profilePage/UPDATE_INCOME'
const SET_SALARY = 'profilePage/SET_SALARY'
const NEW_CHILD = 'profilePage/NEW_CHILD'
const SET_NEW_PROFILE = 'profilePage/SET_NEW_PROFILE'

let initialState = {
  // список возможных персонажей . . .
  // виды расходов
  // дом / машина / кредитная карта / кредит
  // для каждого расходов есть своя фикс. сумма и % который надо выплачивать каждый месяц
  persons: [
    {
      name: 'Эдди',
      age: 28,
      saving: 1100,
      salary: 700,
      work: 'Маркетолог',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 4000, startPrice: 4000, payment: 2},
        {type: 'car', title: 'Машина', remainPrice: 1500, startPrice: 1500, payment: 5},
        {type: 'card', title: 'Кред. карта', remainPrice: 800, startPrice: 800, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 1200, startPrice: 1200, payment: 5},
      ],
      difficulty: "easy",
      img: person1Photo,
      avatar: person1Avatar,
    },
    {
      name: 'Макс',
      age: 24,
      saving: 1000,
      salary: 750,
      work: 'Менеджер',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 3000, startPrice: 3000, payment: 4},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice:0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 1700, startPrice: 1700, payment: 4},
      ],
      difficulty: 'easy',
      img: person2Photo,
      avatar: person2Avatar
    },
    {
      name: 'Билл',
      age: 19,
      saving: 830,
      salary: 520,
      work: 'Разработчик',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1000, startPrice: 1000, payment: 3},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 2},
        {type: 'credit', title: 'Кредит', remainPrice: 1000, startPrice: 1000, payment: 3},
      ],
      difficulty: 'normal',
      img: person3Photo,
      avatar: person3Avatar
    },
    {
      name: 'Кейт',
      age: 23,
      saving: 720,
      salary: 530,
      work: 'Переводчик',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1400, startPrice: 1400, payment: 3},
        {type: 'car', title: 'Машина', remainPrice: 2000, startPrice: 2000, payment: 4},
        {type: 'card', title: 'Кред. карта', remainPrice: 600, startPrice: 600, payment: 6},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'normal',
      img: person4Photo,
      avatar: person4Avatar
    },
    {
      name: 'Фред',
      age: 21,
      saving: 530,
      salary: 370,
      work: 'Официант',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1300, startPrice: 1300, payment: 4},
        {type: 'credit', title: 'Кредит', remainPrice: 1000, startPrice: 1000, payment: 3},
      ],
      difficulty: 'hard',
      img: person5Photo,
      avatar: person5Avatar
    },
    {
      name: 'Джимми',
      age: 25,
      saving: 925,
      salary: 930,
      work: 'Режиссёр',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 2500, startPrice: 2500, payment: 6},
        {type: 'car', title: 'Машина', remainPrice: 800, startPrice: 800, payment: 5},
        {type: 'card', title: 'Кред. карта', remainPrice: 1700, startPrice: 1700, payment: 4},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'easy',
      img: person6Photo,
      avatar: person6Avatar
    },
    {
      name: 'Брэд',
      age: 31,
      saving: 890,
      salary: 670,
      work: 'Страховщик',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1200, startPrice: 1200, payment: 4},
        {type: 'car', title: 'Машина', remainPrice: 1000, startPrice: 1000, payment: 4},
        {type: 'card', title: 'Кред. карта', remainPrice: 2000, startPrice: 2000, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'easy',
      img: person7Photo,
      avatar: person7Avatar
    },
    {
      name: 'Лизи',
      age: 26,
      saving: 710,
      salary: 550,
      work: 'Бухгалтер',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1000, startPrice: 1000, payment: 6},
        {type: 'car', title: 'Машина', remainPrice: 1200, startPrice: 1200, payment: 4},
        {type: 'card', title: 'Кред. карта', remainPrice: 900, startPrice: 900, payment: 5},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'normal',
      img: person8Photo,
      avatar: person8Avatar
    },
    {
      name: 'Изабель',
      age: 18,
      saving: 1200,
      salary: 650,
      work: 'Танцовщица',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1400, startPrice: 1400, payment: 3},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1500, startPrice: 1500, payment: 4},
        {type: 'credit', title: 'Кредит', remainPrice: 1000, startPrice: 1000, payment: 3},
      ],
      difficulty: 'easy',
      img: person9Photo,
      avatar: person9Avatar
    },
    {
      name: 'Фрэнк',
      age: 29,
      saving: 55000,
      salary: 600,
      work: 'Продюсер',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1200, startPrice: 1200, payment: 7},
        {type: 'car', title: 'Машина', remainPrice: 1000, startPrice: 1000, payment: 8},
        {type: 'card', title: 'Кред. карта', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'credit', title: 'Кредит', remainPrice: 850, startPrice: 850, payment: 6},
      ],
      difficulty: 'normal',
      img: person10Photo,
      avatar: person10Avatar
    },
    {
      name: 'Алекс',
      age: 28,
      saving: 510,
      salary: 360,
      work: 'Журналист',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1200, startPrice: 1200, payment: 5},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1050, startPrice: 550, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'hard',
      img: person11Photo,
      avatar: person11Avatar
    },
    {
      name: 'Адам',
      age: 28,
      saving: 740,
      salary: 580,
      work: 'Имиджмейкер',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1000, startPrice: 1000, payment: 12},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'credit', title: 'Кредит', remainPrice: 800, startPrice: 800, payment: 8},
      ],
      difficulty: 'normal',
      img: person12Photo,
      avatar: person12Avatar
    },
    {
      name: 'Хейли',
      age: 27,
      saving: 560,
      salary: 330,
      work: 'Учитель',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1500, startPrice: 1500, payment: 2},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'hard',
      img: person13Photo,
      avatar: person13Avatar
    },
    {
      name: 'Лили',
      age: 26,
      saving: 540,
      salary: 370,
      work: 'Врач',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 700, startPrice: 700, payment: 4},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 3},
        {type: 'credit', title: 'Кредит', remainPrice: 600, startPrice: 600, payment: 5},
      ],
      difficulty: 'hard',
      img: person14Photo,
      avatar: person14Avatar
    },
    {
      name: 'Боб',
      age: 23,
      saving: 640,
      salary: 890,
      work: 'Инженер',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 1500, startPrice: 1500, payment: 7},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 1000, startPrice: 1000, payment: 4},
        {type: 'credit', title: 'Кредит', remainPrice: 200, startPrice: 200, payment: 7},
      ],
      difficulty: 'easy',
      img: person15Photo,
      avatar: person15Avatar
    },
    {
      name: 'Эльза',
      age: 21,
      saving: 600,
      salary: 550,
      work: 'Эскортинца',
      expenses: [
        {type: 'home', title: 'Дом', remainPrice: 2400, startPrice: 2400, payment: 6},
        {type: 'car', title: 'Машина', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'card', title: 'Кред. карта', remainPrice: 0, startPrice: 0, payment: 0},
        {type: 'credit', title: 'Кредит', remainPrice: 0, startPrice: 0, payment: 0},
      ],
      difficulty: 'normal',
      img: person16Photo,
      avatar: person16Avatar
    }
  ] as personType[],
  // наш профиль . . .
  profile: null as null | personType, // профиль персонажа
  startSalary: 0, // начальная зп
  tax: 0, // налог с зп
  income: 0, // доход персонажа
  childrenCount: 0 // количество детей...
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

    case NEW_CHILD:
      return {
        ...state,
        childrenCount: state.childrenCount + 1
      }

    case SET_NEW_PROFILE:
      return {
        ...state,
        profile: action.profile,
        startSalary: action.startSalary,
        income: action.income,
        childrenCount: action.childrenCount,
        tax: action.tax
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
  updateExpenses: () => ({type: UPDATE_EXPENSES} as const),
  payForExpenses: (expenses: expenseType[]) => ({type: PAY_FOR_EXPENSES, expenses} as const),
  setCredit: (expenses: expenseType[]) => ({type: SET_CREDIT, expenses} as const),
  updateIncome: (newIncome: number) => ({type: UPDATE_INCOME, newIncome} as const),
  setSalary: (newSalary: number) => ({type: SET_SALARY, newSalary} as const),
  newChild: () => ({type: NEW_CHILD} as const),
  setNewProfile: (startSalary: number, income: number, children: number[], childrenCount: number, profile: personType, tax: number) => ({type: SET_NEW_PROFILE, startSalary, income, childrenCount, children, profile, tax} as const )
}

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
  // добавляем выплаты по кредиту в профиль игрока...
  dispatch(profileActions.setCredit(expensesCopy))
  // @ts-ignore начисляем сумму кредита на счет игрока...
  dispatch(actions.updateWalletFromSpends(-creditAmount))
  // обновляем доход персонажа... (теперь он платит процент по кредиту...)
  dispatch(updateIncome())
}
export const updateIncome = (): ProfileThunkType => (dispatch, getState) => {
  // Изменить суммарные подсчеты начислений на баланс игрока...
  const profilePage = getState().profilePage
  const profile = profilePage.profile as personType
  const tax = profilePage.tax
  const salary = profile.salary
  const myStocks = getState().stocksPage.myStocks
  const myRealty = getState().realtyPage.myRealty
  const myBusiness = getState().businessPage.myBusinesses
  // начисление с аекций
  let dividendsSummary = myStocks.reduce((acc, next) => acc + next.dividendsAmount * next.count, 0)
  // начисления с недвижимости
  let realtySummary = myRealty.reduce((acc, next) => acc + next.income, 0)
  // начисления с бизнесса
  let businessSummary = myBusiness.reduce((acc, next) => acc + next.income, 0)
  // долги игрока...
  let expensesSummary = profile.expenses.reduce((acc, next) => next.remainPrice > 0 ? acc + next.startPrice * next.payment / 100 : acc, 0)
  // плата за детей...
  let childrenSummary = profilePage.childrenCount * 125
  // считаем новый доход персонажа...
  let NewIncome = Math.round(salary - tax - expensesSummary - childrenSummary + dividendsSummary + realtySummary + businessSummary)
  // новый доход игрока...
  dispatch(profileActions.updateIncome(NewIncome))
}
export type ProfileActionsType = InferActionsType<typeof profileActions>

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
  difficulty: 'easy' | 'normal' | 'hard'
  expenses: expenseType[]
}
type ProfileThunkType = ThunkAction<any, AppStateType, unknown, ProfileActionsType>
