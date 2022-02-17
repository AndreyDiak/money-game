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

const UPDATE_WALLET_FROM_SPENDS = 'gamePage/UPDATE_WALLET_FROM_SPENDS'

const BUY_BUSINESS = 'gamePage/BUY_BUSINESS'
const SELL_BUSINESS = 'gamePage/SELL_BUSINESS'

const INIT_GAME = 'gamePage/INIT_GAME'

const GET_NEWS_PAYOUT = 'gamePage/GET_NEWS_PAYOUT'
const UPDATE_BUSINESS_INCOME = 'gamePage/UPDATE_BUSINESS_INCOME'

const SET_VICTORY_BALANCE = 'gamePage/SET_VICTORY_BALANCE'

const SET_NEW_GAME = 'gamePage/SET_NEW_GAME'

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
  // баланс необходимый для победы / возможно потом его можно менять . . .
  victoryBalance: 15000,
  // баланс для пораженя
  loseBalance: 0,
  // месяцы игры . . .
  months: [
    {name: 'Январь', duration: 31}, {name: 'Февраль', duration: 28}, {name: 'Март', duration: 31},
    {name: 'Апрель', duration: 30}, {name: 'Май', duration: 31}, {name: 'Июнь', duration: 30},
    {name: 'Июль', duration: 31}, {name: 'Август', duration: 31}, {name: 'Сентябрь', duration: 30},
    {name: 'Октябрь', duration: 31}, {name: 'Ноябрь', duration: 30}, {name: 'Декабрь', duration: 31},
  ],
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
      return {
        ...state,
        daysInMonth: action.dayInMonth
      }
    // установка баланса
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
        wallet: Math.round(state.wallet + action.wallet)
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
    // обновляем данные по кошельку после покупки бизнесса
    case BUY_BUSINESS:
      return {
        ...state,
        wallet: Math.round(state.wallet - action.price),
        income: Math.round(state.income + action.income)
      }
    // продажа бизнесса
    case SELL_BUSINESS:
      return {
        ...state,
        wallet: Math.round(state.wallet + action.price),
        income: Math.round(state.income - action.income)
      }
    // обновление дохода бизнесса . . .
    case UPDATE_BUSINESS_INCOME:
      return {
        ...state,
        income: state.income + action.income
      }
    // обновление кошелька из-за затрат
    case UPDATE_WALLET_FROM_SPENDS:
      return {
        ...state,
        wallet: state.wallet - action.wallet
      }
    // выбор стартового баланса для победы . . .
    case SET_VICTORY_BALANCE:
      return {
        ...state,
        victoryBalance: action.victory
      }
    // стартовая инициализация игры . . .
    case INIT_GAME:
      return {
        ...state,
        day: 1,
        level: 1,
        daysInMonth: 0,
        month: 0,
        wallet: 0,
        income: 0,
        // happenedEvents: Array(12).fill([] as eventType[])
      }

    case SET_NEW_GAME:
      return {
        ...state,
        day: action.day,
        daysInMonth: action.dayInMonth,
        month: action.month,
        wallet: action.wallet,
        victoryBalance: action.victoryBalance
      }
    default:
      return state
  }
}

export const actions = {
  // actions даты и времени . . .
  setDay: (day: number) => ({type: SET_DAY, day} as const),
  setMonth: (month: number) => ({type: SET_MONTH, month} as const),
  setDayInMonth: (dayInMonth: number) => ({type: SET_DAY_IN_MONTH, dayInMonth} as const),
  // actions для кошелька . . .
  setWallet: (wallet: number) => ({type: SET_WALLET, wallet} as const),
  updateWallet: (wallet: number) => ({type: UPDATE_WALLET, wallet} as const),
  setIncome: (income: number) => ({type: SET_INCOME, income} as const),
  updateWalletFromSpends: (wallet: number) => ({type: UPDATE_WALLET_FROM_SPENDS, wallet} as const),
  getNewsPayout: (payout: 'one' | 'regular', amount: number) => ({type: GET_NEWS_PAYOUT, payout, amount} as const),

  setVictoryBalance: (victory: number) => ({type: SET_VICTORY_BALANCE, victory} as const),
  // actions для бизнесса . . .
  buyBusiness: (price: number, income: number) => ({type: BUY_BUSINESS, price, income} as const),
  sellBusiness: (price: number, income: number) => ({type: SELL_BUSINESS, price, income} as const),
  updateBusinessIncome: (income: number) => ({type: UPDATE_BUSINESS_INCOME, income} as const),
  initGame: () => ({type: INIT_GAME} as const),

  setNewGame: (day: number, dayInMonth: number, month: number, wallet: number, victoryBalance: number) => ({type: SET_NEW_GAME, day, dayInMonth, month, wallet, victoryBalance} as const)
}

type ActionsType = InferActionsType<typeof actions>
