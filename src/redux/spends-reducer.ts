// spends and update . . .
import {DifficultyType} from "./settings-reducer";
import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {actions} from "./game-reducer";

const WEEK_SPEND = 'gamePage/WEEK_SPEND'
const INDEX_PRICE = 'gamePage/INDEX_PRICE'
const RESET_CURRENT_MONTHS = 'gamePage/RESET_CURRENT_MONTHS'

let initialState = {
  //
  initialEvents: [
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
    }
  ],
  // вероятные события . . .
  events: [
  ] as eventType[],
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
        events: state.initialEvents.map(event => {
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

export const spendsActions = {
  setEventsPrice: (indexPrice: number) => ({type: INDEX_PRICE, indexPrice} as const),
  weekSpend: (events: eventType[], currentMonthEvents: eventType[], currentMonthPrice: number) => ({type: WEEK_SPEND, events, currentMonthEvents, currentMonthPrice} as const),
  resetCurrentMonth: () => ({type: RESET_CURRENT_MONTHS} as const)
}

export type eventType = {
  title: string
  price: number
}
export type InitialSpendsStateType = typeof initialState
type SpendsActionType = InferActionsType<typeof spendsActions>
type SpendsThunkType = ThunkAction<any, AppStateType, unknown, SpendsActionType>

export const weekSpendThunk = (difficulty: DifficultyType): SpendsThunkType => (dispatch, getState) => {
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
  let event = Number((Math.random() * (events.length - 1)).toFixed(0))

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