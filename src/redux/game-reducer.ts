import {InferActionsType} from "./store";
import {DifficultyType} from "./settings-reducer";

// time . . .
const SET_TIME_SPEED = 'gamePage/SET_TIME_SPEED'
const SET_DAY = 'gamePage/SET_DAY'
const SET_MONTH = 'gamePage/SET_MONTH'
const SET_DAY_IN_MONTH = 'gamePage/SET_DAY_IN_MONTH'

// wallet . . .
const SET_WALLET = 'gamePage/SET_WALLET'
const UPDATE_WALLET = 'gamePage/UPDATE_WALLET'
const SET_INCOME = 'gamePage/SET_INCOME'

const SET_BUSINESSES = 'gamePage/SET_BUSINESSES'

// spends and update . . .
const WEEK_SPEND = 'gamePage/WEEK_SPEND'
const INDEX_PRICE = 'gamePage/INDEX_PRICE'

const GET_NEWS_PAYOUT = 'gamePage/GET_NEWS_PAYOUT'

let initialState = {
  // счётчик дней . . .
  day: 1,
  // уровень персонажа
  level: 1,
  // день месяца
  daysInMonth: 0,
  // текущий месяц игры . . .
  month: 0,
  // баланс игрока . . .
  wallet: 0,
  // доход игрока . . .
  income: 0,
  // месяцы игры . . .
  months: [
    {name: 'Январь', duration: 31}, {name: 'Февраль', duration: 28}, {name: 'Март', duration: 31},
    {name: 'Апрель', duration: 30}, {name: 'Май', duration: 31}, {name: 'Июнь', duration: 30},
    {name: 'Июль', duration: 31}, {name: 'Август', duration: 31}, {name: 'Сентябрь', duration: 30},
    {name: 'Октябрь', duration: 31}, {name: 'Ноябрь', duration: 30}, {name: 'Декабрь', duration: 31},
  ],
  // вероятные события . . .
  events: [
    {
      title: 'кинотеатр',
      price: 75
    }, {
      title: 'ресторан',
      price: 120
    }, {
      title: 'покупка продуктов',
      price: 65
    }, {
      title: 'новая одежда',
      price: 90
    }, {
      title: 'прогулка',
      price: 30
    }, {
      title: 'ремонт машины',
      price: 220
    }, {
      title: 'покупка мебели',
      price: 75
    }, {
      title: 'одолжил другу',
      price: 30
    }, {
      title: 'благотворительность',
      price: 40
    }, {
      title: 'подох в ТЦ',
      price: 80
    }, {
      title: 'оплата подписки',
      price: 45
    }, {
      title: 'сходить на футбол',
      price: 120
    }, {
      title: 'встреча с друзьями',
      price: 70
    }, {
      title: 'помог родителям',
      price: 100
    }, {
      title: 'улучшение рабочего места',
      price: 110
    },

  ] as eventType[],
  // случившиеся события . . .
  happenedEvents: Array(12).fill([] as eventType[]),
}

export type InitialGameStateType = typeof initialState

export const gameReducer = (state = initialState, action: ActionsType): InitialGameStateType => {
  switch (action.type) {
    // обновляем счётчик дней
    case SET_DAY:
      return {
        ...state,
        day: action.day
      }
    // обновляем месяц
    case SET_MONTH:
      return {
        ...state,
        month: action.month
      }
    // обновляем баланс кошелька
    case SET_DAY_IN_MONTH:
      console.log(action.dayInMonth)
      return {
        ...state,
        daysInMonth: action.dayInMonth
      }
    case SET_WALLET:
      return {
        ...state,
        wallet: action.wallet
      }
    // установление зарплаты
    case SET_INCOME:
      return {
        ...state,
        income: action.income
      }
    // обновление баланса
    case UPDATE_WALLET:
      return {
        ...state,
        wallet: state.wallet + state.income + action.wallet
      }
    // обновление кошелька после новостей
    case GET_NEWS_PAYOUT:

      let indexWallet = 0
      let indexIncome = 0

      switch (action.payout) {
        case "one":
          indexWallet += action.amount
          break
        case "regular":
          indexIncome += action.amount
          break
      }

      return {
        ...state,
        wallet: state.wallet + indexWallet,
        income: state.income + indexIncome
      }
    // еженедельные траты игрока
    case WEEK_SPEND:
      // берем случайное событие . . .
      let event = Number((Math.random() * (state.events.length - 1)).toFixed(0))
      // копия массива с текущими событиями . . .
      let happenedEventsCopy = [...state.happenedEvents]
      happenedEventsCopy[state.month] = [...happenedEventsCopy[state.month], state.events[event]]

      // определение цены, которую должен потратить игрок . . .
      let priceToSpend = state.events[event].price
      return {
        ...state,
        happenedEvents: happenedEventsCopy,
        wallet: state.wallet - priceToSpend
      }
    // обновление цены на события
    case INDEX_PRICE:
      return {
        ...state,
        events: state.events.map(event => {
          return {
            ...event,
            price: event.price + action.indexPrice
          }
        })
      }
    default:
      return state
  }
}

export const actions = {
  setDay: (day: number) => ({type: SET_DAY, day} as const),
  setMonth: (month: number) => ({type: SET_MONTH, month} as const),
  setDayInMonth: (dayInMonth: number) => ({type: SET_DAY_IN_MONTH, dayInMonth} as const),

  setWallet: (wallet: number) => ({type: SET_WALLET, wallet} as const),
  updateWallet: (wallet: number) => ({type: UPDATE_WALLET, wallet} as const),
  setIncome: (income: number) => ({type: SET_INCOME, income} as const),

  getNewsPayout: (payout: 'one' | 'regular', amount: number) => ({type: GET_NEWS_PAYOUT, payout, amount} as const),

  setEventsPrice: (indexPrice: number) => ({type: INDEX_PRICE, indexPrice} as const),
  weekSpend: (difficult: DifficultyType) => ({type: WEEK_SPEND, difficult} as const),

}

type ActionsType = InferActionsType<typeof actions>

export type eventType = {
  title: string
  price: number
}