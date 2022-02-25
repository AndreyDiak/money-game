// spends and update . . .
import { ThunkAction } from "redux-thunk";
import { getRandomNumber } from "../utils/getRandomNumber";
import { actions } from "./game-reducer";
import { AppStateType, InferActionsType } from "./store";

const WEEK_SPEND = 'gamePage/WEEK_SPEND'
const INDEX_PRICE = 'gamePage/INDEX_PRICE'
const RESET_CURRENT_MONTHS = 'gamePage/RESET_CURRENT_MONTHS'
const SET_SPENDS_LEVEL = 'gamePage/SET_SPENDS_LEVEL'
const DECREASE_SPENDS_LEVEL = 'gamePage/DECREASE_SPENDS_LEVEL'
const SET_NEW_SPENDS = 'spendsPage/SET_NEW_SPENDS'

let initialState = {
  //
  initialEvents: [
    [
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
        title: 'поход в ТЦ',
        price: 80
      }, {
        title: 'оплата подписки',
        price: 45
      }, {
        title: 'игра любимой команды',
        price: 120
      }, {
        title: 'встреча с друзьями',
        price: 70
      }, {
        title: 'помощь родителям',
        price: 100
      }, {
        title: 'улучшение рабочего места',
        price: 110
      }
    ], // начальный траты
    [
      {
        title: 'благотворительность',
        price: 250
      }, {
        title: 'оплата подписок',
        price: 370
      }, {
        title: 'помощь родителям',
        price: 320
      }, {
        title: 'новая одежда',
        price: 410
      }, {
        title: 'ремонт машины',
        price: 500
      }, {
        title: 'ресторан',
        price: 400
      }, {
        title: 'кинотеатр',
        price: 350
      }, {
        title: 'подох в ТЦ',
        price: 380
      }, {
        title: 'одолжил другу',
        price: 200
      }, {
        title: 'покупка продуктов',
        price: 230
      }, {
        title: 'прогулка',
        price: 280
      }, {
        title: 'поход в музей',
        price: 300
      }, {
        title: 'поход на аукцион',
        price: 315
      }
    ], // средние траты
    [
      {
        title: 'благотворительность',
        price: 1000
      }, {
        title: 'оплата подписок',
        price: 1200
      }, {
        title: 'помощь родителям',
        price: 1500
      }, {
        title: 'новая одежда',
        price: 1300
      }, {
        title: 'ресторан',
        price: 1700
      }, {
        title: 'кинотеатр',
        price: 1100
      }, {
        title: 'подох в ТЦ',
        price: 1600
      }, {
        title: 'одолжил другу',
        price: 950
      }, {
        title: 'покупка продуктов',
        price: 800
      }, {
        title: 'прогулка',
        price: 1150
      }
    ] // большие траты
  ],
  // вероятные события . . .
  events: [] as eventType[], // массив откуда берутся различный события . . .
  // уровень трат
  spendsLevel: 1, // 1 - начальные траты / 2 - средние траты / 3 - максимальные траты ( под конец игры )
  // траты в текущий месяц . . .
  currentMonthEvents: [] as eventType[],
  // сумма трат за месяц . . .
  currentMonthPrice: 0,
  // случившиеся события . . .
  happenedEvents: Array(12).fill([] as eventType[]),
}

export const spendsReducer = (state = initialState, action: SpendsActionType): InitialSpendsStateType => {
  switch (action.type) {
    // еженедельные траты игрока
    case WEEK_SPEND:
      return {
        ...state,
        happenedEvents: action.events,
        currentMonthEvents: action.currentMonthEvents,
        currentMonthPrice: action.currentMonthPrice
      }
    case RESET_CURRENT_MONTHS:
      return {
        ...state,
        currentMonthEvents: [] as eventType[],
        currentMonthPrice: 0
      }
    // обновление цены на события
    case INDEX_PRICE:
      return {
        ...state,
        events: state.initialEvents[state.spendsLevel - 1].map(event => {
          return {
            ...event,
            price: event.price
              // + action.indexPrice
          }
        })
      }
    case SET_SPENDS_LEVEL:
      return {
        ...state,
        spendsLevel: state.spendsLevel + 1
      }
    case DECREASE_SPENDS_LEVEL:
      return {
        ...state,
        spendsLevel: state.spendsLevel - 1
      }
    case SET_NEW_SPENDS:
      return {
        ...state,
        spendsLevel: action.sLevel,
        events: action.spends,
        currentMonthPrice: action.sPrice,
        currentMonthEvents: action.monthSpends,
        happenedEvents: action.happenedEvents
      }
    default:
      return state
  }
}

export const spendsActions = {
  setEventsPrice: () => ({type: INDEX_PRICE} as const),
  weekSpend: (events: eventType[], currentMonthEvents: eventType[], currentMonthPrice: number) => ({type: WEEK_SPEND, events, currentMonthEvents, currentMonthPrice} as const),
  resetCurrentMonth: () => ({type: RESET_CURRENT_MONTHS} as const),
  setSpendsLevel: () => ({type: SET_SPENDS_LEVEL} as const),
  decreaseSpendsLevel: () => ({type: DECREASE_SPENDS_LEVEL} as const),
  setNewsSpends: (sLevel: number, spends: eventType[], sPrice: number, monthSpends: eventType[], happenedEvents: []) => ({type: SET_NEW_SPENDS, sLevel, spends, sPrice, monthSpends, happenedEvents} as const)
}

export type eventType = {
  title: string
  price: number
}
export type InitialSpendsStateType = typeof initialState
export type SpendsActionType = InferActionsType<typeof spendsActions>
type SpendsThunkType = ThunkAction<any, AppStateType, unknown, SpendsActionType>

export const weekSpendThunk = (): SpendsThunkType => (dispatch, getState) => {
  // возможные события
  let events = getState().spendsPage.events
  // копия массива с событиями
  let happenedEventsCopy = [...getState().spendsPage.happenedEvents]
  // индекс текущего месяц
  let month = getState().gamePage.month
  // события этого месяца
  let currentMonthEventsCopy = getState().spendsPage.currentMonthEvents
  // сумма трат этого месяца
  let currentMonthPriceCopy = getState().spendsPage.currentMonthPrice

  // берем случайное событие . . .
  let event = getRandomNumber(events.length-1)

  // копия массива с текущими событиями . . .
  // let happenedEventsCopy = [...happenedEvents]
  happenedEventsCopy[month] = [...happenedEventsCopy[month], events[event]]
  currentMonthEventsCopy = [...currentMonthEventsCopy, events[event]]
  // определение цены, которую должен потратить игрок . . .
  let priceToSpend = events[event].price

  currentMonthPriceCopy += priceToSpend
  // обновляем массив с новостями
  dispatch(spendsActions.weekSpend(happenedEventsCopy, currentMonthEventsCopy, currentMonthPriceCopy))
  // @ts-ignore / вычетаем из баланса
  dispatch(actions.updateWalletFromSpends(priceToSpend))
}