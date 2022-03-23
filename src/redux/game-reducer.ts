import { ThunkAction } from 'redux-thunk';
import { businessActions } from './business-reducer';
import { newsActions } from './news-reducer';
import { profileActions, ProfileActionsType, updateIncome } from './profile-reducer';
import { activeRealtyType, buyRealtyThunk, ChanceType, generateActiveRealtyThunk, RealtyActionsType } from './realty-reducer';
import { settingsActions, SettingsActionType } from './settings-reducer';
import { spendsActions, SpendsActionType } from './spends-reducer';
import { brokerType, stocksActions, StocksActionType, stockType } from './stocks-reducer';
import { AppStateType, InferActionsType } from "./store";

// time . . .
// const SET_TIME_SPEED = 'gamePage/SET_TIME_SPEED'
const SET_DAY = 'gamePage/SET_DAY'
const SET_MONTH = 'gamePage/SET_MONTH'
const SET_DAY_IN_MONTH = 'gamePage/SET_DAY_IN_MONTH'
const SET_DIFFICULTY = 'gamePage/SET_DIFFICULTY'
// wallet . . .
const SET_WALLET = 'gamePage/SET_WALLET'
const UPDATE_WALLET = 'gamePage/UPDATE_WALLET'
const SET_INCOME = 'gamePage/SET_INCOME'

const UPDATE_WALLET_FROM_SPENDS = 'gamePage/UPDATE_WALLET_FROM_SPENDS'
const UPDATE_HISTORY = 'gamePage/UPDATE_HISTORY'

const BUY_BUSINESS = 'gamePage/BUY_BUSINESS'
const SELL_BUSINESS = 'gamePage/SELL_BUSINESS'

const INIT_GAME = 'gamePage/INIT_GAME'

const GET_NEWS_PAYOUT = 'gamePage/GET_NEWS_PAYOUT'
const UPDATE_BUSINESS_INCOME = 'gamePage/UPDATE_BUSINESS_INCOME'

const SET_VICTORY_BALANCE = 'gamePage/SET_VICTORY_BALANCE'

const SET_NEW_GAME = 'gamePage/SET_NEW_GAME'
const SET_GAME_STATUS = 'gamePage/SET_GAME_STATUS'
const UPDATE_POPUPS = 'gamePage/UPDATE_POPUPS'

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
  //
  difficulty: 'easy' as DifficultyType,
  // баланс для поражения
  loseBalance: 0,
  //
  gameStatus: 'process' as GameStatusType,
  // массив событий, покупка / продажа акций...
  history: [] as HistoryType[],
  // объект с попапами...
  popups: {
    // покупка акций / облигаций...
    stock: {
      isShown: false,
      active: {} as stockType
    },
    // продажа акций / облигаций...
    myStock: {
      isShown: false,
      active: 0
    },
    // окно с маржинальной торговлей...
    broker: {
      isShown: false,
      active: {} as brokerType
    },
    // покупка недвижимости...
    realtyBuy: {
      isShown: false,
      active: {} as activeRealtyType // сам объект недвижимости...
    },
    // проадажа недвижимости...
    realtySell: {
      isShown: false,
      active: '' as ChanceType // регион в котором хотят купить недвижимость...
    },
    // возващение маржи
    margin: {
      isShown: false,
    },
    // просмотр истории покупок / продаж
    history: {
      isShown: false,
    },
    // менюшка рынков
    market: {
      isShown: false
    }
  },
  // месяцы игры . . .
  months: [
    {name: 'Январь', duration: 31}, {name: 'Февраль', duration: 28}, {name: 'Март', duration: 31},
    {name: 'Апрель', duration: 30}, {name: 'Май', duration: 31}, {name: 'Июнь', duration: 30},
    {name: 'Июль', duration: 31}, {name: 'Август', duration: 31}, {name: 'Сентябрь', duration: 30},
    {name: 'Октябрь', duration: 31}, {name: 'Ноябрь', duration: 30}, {name: 'Декабрь', duration: 31},
  ],
}

export type InitialGameStateType = typeof initialState

export const gameReducer = (state = initialState, action: GameActionsType): InitialGameStateType => {
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
    case UPDATE_HISTORY:
      return {
        ...state,
        history: [...state.history, action.history]
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
      }
    case SET_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.status
        
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
  setDifficulty: (difficulty: DifficultyType) => ({type: SET_DIFFICULTY, difficulty} as const),
  // actions для кошелька . . .
  setWallet: (wallet: number) => ({type: SET_WALLET, wallet} as const),
  updateWallet: (wallet: number) => ({type: UPDATE_WALLET, wallet} as const),
  setIncome: (income: number) => ({type: SET_INCOME, income} as const),
  updateWalletFromSpends: (wallet: number) => ({type: UPDATE_WALLET_FROM_SPENDS, wallet} as const),
  getNewsPayout: (payout: 'one' | 'regular', amount: number) => ({type: GET_NEWS_PAYOUT, payout, amount} as const),

  updateHistory: (history: any) => ({type: UPDATE_HISTORY, history} as const),
  setVictoryBalance: (victory: number) => ({type: SET_VICTORY_BALANCE, victory} as const),
  // actions для бизнесса . . .
  buyBusiness: (price: number, income: number) => ({type: BUY_BUSINESS, price, income} as const),
  sellBusiness: (price: number, income: number) => ({type: SELL_BUSINESS, price, income} as const),
  updateBusinessIncome: (income: number) => ({type: UPDATE_BUSINESS_INCOME, income} as const),
  initGame: () => ({type: INIT_GAME} as const),

  setNewGame: (day: number, dayInMonth: number, month: number, wallet: number, victoryBalance: number) => ({type: SET_NEW_GAME, day, dayInMonth, month, wallet, victoryBalance} as const),
  setGameStatus: (status: GameStatusType) => ({type: SET_GAME_STATUS, status} as const),
  updatePopups: (popups: any) => ({type: UPDATE_POPUPS, popups} as const)
}

export const updateMonthThunk = (): ActionThunkType => (dispatch, getState) => {
  const income = getState().profilePage.income
  const spendsLevel = getState().spendsPage.spendsLevel
  // ставим первый день в месяце
  dispatch(actions.setDayInMonth(1))
  // зануляем траты прошлого месяца
  dispatch(spendsActions.resetCurrentMonth())
  // чистая прибыль персонажа в месяц
  dispatch(actions.updateWallet(income))
  // создаем предложение по недвижимости
  dispatch(generateActiveRealtyThunk())
  dispatch(buyRealtyThunk(10000))
  // уменьшаем необходимую выплату по долгу на месячную ставку
  dispatch(profileActions.updateExpenses())
  // если мы выплатили целиком какой либо долг, то у нас растет ЗП
  dispatch(updateIncome())
  
  if (income >= 250) {
    dispatch(stocksActions.indexingBonds())
  }
  // если наш доход перевалил за $1000 или $4500 в месяц, то мы увеличиваем траты
  if ((income >= 1000 && spendsLevel === 1) || (income >= 4500 && spendsLevel === 2)) {
    dispatch(spendsActions.setSpendsLevel())
    dispatch(spendsActions.setEventsPrice())
  }

  if ((income < 1000 && spendsLevel === 2) || (income < 4500 && spendsLevel === 3)) {
    dispatch(spendsActions.decreaseSpendsLevel())
    dispatch(spendsActions.setEventsPrice())
  }

}
export const balanceCheckThunk = (): ActionThunkType => (dispatch, getState) => {
  const income = getState().gamePage.income
  const wallet = getState().gamePage.wallet
  const victoryBalance = getState().gamePage.victoryBalance
  const loseBalance = getState().gamePage.loseBalance

  const resetGame = () => {
    
    dispatch(settingsActions.setTimeSpeed(0))
    dispatch(stocksActions.resetMyStocks())
    // @ts-ignore
    dispatch(businessActions.resetMyBusinesses())
    // @ts-ignore
    dispatch(newsActions.resetNews())
  }
  
  if (wallet <= loseBalance) {
    // player lose...
    dispatch(actions.setGameStatus('lose'))
    resetGame()
  } else {
    if (income >= victoryBalance) {
      // player win
      dispatch(actions.setGameStatus('win'))   
    }
  }
}
export const updateHistoryThunk = (target: any, operationType: 'buy' | 'sell', amount: number): ActionThunkType => (dispatch, getState) => {
  dispatch(actions.updateHistory({
      title: target.title ? target.title : target.stockTitle,
      price: target.price ? target.price : target.stockPrice, 
      operationType,
      amount
    }))
}
// thunk для отображения той или иной модалки...
export const setPopupsShownThunk = (type: PopupsType, isShown: boolean ): ActionThunkType => (dispatch, getState) => {
  let popupsCopy = getState().gamePage.popups
  popupsCopy[type].isShown = isShown
  dispatch(actions.updatePopups(popupsCopy))
}
// thunk, если в модалку надо передать какой либо активный элемент...
export const setPopupsActiveThunk = (type: PopupsType, active: any): ActionThunkType => (dispatch, getState) => {
  let popupsCopy = getState().gamePage.popups
  // @ts-ignore
  popupsCopy[type].active = active
  dispatch(actions.updatePopups(popupsCopy))
}
interface HistoryType {
  title: string
  price: number
  operationType: 'buy' | 'sell'
  amount: number
}
export type DifficultyType = 'easy' | 'normal' | 'hard'
export type GameStatusType = 'process' | 'win' | 'lose'
export type PopupsType = 'stock' | 'myStock' | 'broker' | 'realtyBuy' | 'realtySell' | 'margin' | 'history' | 'market'
export type GameActionsType = InferActionsType<typeof actions>
type ActionThunkType = ThunkAction<any, AppStateType, unknown, 
GameActionsType | SpendsActionType | RealtyActionsType | ProfileActionsType | StocksActionType | SettingsActionType>
