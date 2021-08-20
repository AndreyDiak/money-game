import {InferActionsType} from "./store";

const SET_STOCKS = 'gamePage/SET_STOCKS'
const SELL_STOCKS = 'gamePage/SELL_STOCKS'
const UPDATE_MY_STOCKS = 'gamePage/UPDATE_MY_STOCKS'
const UPDATE_STOCKS = 'gamePage/UPDATE_STOCKS'
const INDEXING_STOCKS = 'gamePage/INDEXING_STOCKS'

let initialState = {
  // изменение цены . . .
  normalPriceChange: 3,
  // список компания с акциями . . .
  companiesForStocks: [
    'ТрансНефтКомпани', 'ОАО ГазНефтьМагистраль',
    'ОАО СтройПрибор', 'ОАО СвободнаяЭнергия',
    'ОАО ТранспортСтрой', 'ОАО ЦифровыеТехнологии',
    'ОАО КосмосТек', 'МашинСтрой',
    'ОАО КазиноАльянс', 'СибирьТек',
    'ЕвропаБизнес', 'ЗАО АлмазПродажн',
    'ЗАО ПлодЛюбви'
  ],
  // акции в портфеле . . .
  myStocks: [] as myStockType[],
  // акции на рынке . . .
  stocks: [] as stockType[],

}

export const stocksReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {

    // первое создание акций . . .
    case SET_STOCKS:
      // копия массива с акциями . . .
      let initialStocksCopy = [...state.stocks]
      state.companiesForStocks.map(company => {
        // генерируем риск . . .
        let risk = Number((Math.random() * 4 + 1).toFixed(0))
        // генерируем цену . . .
        let price = Number((Math.random() * 150 + 15).toFixed(1))

        let stock: stockType = {
          // название фирмы . . .
          title: company,
          // количество акций на рынке . . .
          count: Number((Math.random() * state.normalPriceChange * (risk + 1) + 1).toFixed(0)),
          // риск акции
          risk: risk,
          // начальная цена . . .
          price: [price],
          // вероятносто того, что акция идёт вверх . . .
          condition: Math.random() * 10 >= (state.normalPriceChange - 1 + risk) ? 'up' : 'down',
          // макс цена акции
          maxPrice: Number((price + Math.random() * state.normalPriceChange * (risk + 1)).toFixed(1)),
          // мин цена акции
          minPrice: Number((price - Math.random() * state.normalPriceChange * risk).toFixed(1)),
        }
        initialStocksCopy.push(stock)
      })
      // вывод акций в консоль для проверки . . .
      console.log(initialStocksCopy)
      return {
        ...state,
        stocks: initialStocksCopy
      }
    // продажа акций . . .
    case SELL_STOCKS:
      let myStocksCopyToSell = [...state.myStocks]
      myStocksCopyToSell.forEach((myStock, index) => {
        if (myStock.title === action.stock.title) {
          // создаем новый объект . . .
          myStocksCopyToSell[index] = {
            ...myStocksCopyToSell[index],
            count: myStocksCopyToSell[index].count - action.count
          }
          // если количество акций === 0, то убираем её из портфеля . . .
          if (myStocksCopyToSell[index].count === 0) {
            // удаляем из массива данные акции . . .
            myStocksCopyToSell.splice(index, 1)
          }
        }
      })
      return {
        ...state,
        myStocks: myStocksCopyToSell
      }
    // изменение цен на акции . . .
    case INDEXING_STOCKS:
      let stocksCopy = [...state.stocks]
      let myStocksCopy = [...state.myStocks]

      state.stocks.map((stock, index) => {
        // изменение количества акций . . .
        let indexCount = Number((Math.random() * 10 - 4).toFixed(0))
        // изменение состояния акций . . .
        let indexCondition: 'up' | 'down' = Math.random() * 10 >= (state.normalPriceChange - 1 + stock.risk) ? 'up' : 'down'
        // изменение цены акции . . .
        let indexPriceCount = Number((stock.risk * Number(Math.random().toFixed(1))).toFixed(1))

        let indexPrice: number = indexCondition === 'up'
          ? stock.price[stock.price.length - 1] + indexPriceCount
          : stock.price[stock.price.length - 1] - indexPriceCount

        indexPrice = Number(indexPrice.toFixed(1))

        stocksCopy[index] = {
          // возвращаем пред. данные . . .
          ...stocksCopy[index],
          // новое состояние роста акции . . .
          condition: indexCondition,
          // новое количество акций . . .
          count: stocksCopy[index].count + indexCount > 0
            ? stocksCopy[index].count + indexCount
            : stocksCopy[index].count,
          // новая цена акции . . .
          // @ts-ignore
          price: (indexPrice > stocksCopy[index].maxPrice) || (indexPrice < stocksCopy[index].minPrice)
            // если цена доходит до своего максимума или минимума , то цена на акции больше не меняется . . .
            ? [
              ...stocksCopy[index].price,
              stock.price[stock.price.length - 1]
            ]
            // обновляем цены на акции при условии, что всё хорошо . . .
            : [
              ...stocksCopy[index].price,
              indexPrice
            ]
        }

        // обновление цены в портфеле игрока . . .
        myStocksCopy.forEach((myStock, i) => {
          if(myStock.title === stock.title) {
            let price = indexPrice
            myStocksCopy[i] = {
              ...myStocksCopy[i],
              price: price,
              condition: price >= myStocksCopy[i].oldPrice ? 'up' : 'down'
            }
          }
        })
      })

      return {
        ...state,
        stocks: stocksCopy,
        myStocks: myStocksCopy
      }
    // обновление цен наших акций . . .
    case UPDATE_MY_STOCKS:
      return {
        ...state,
        myStocks: action.myStocks
      }
    // обновление акций . . .
    case UPDATE_STOCKS:
      return {
        ...state,
        stocks: action.stocks
      }

    default:
      return state
  }
}

export const stocksActions = {

  setStocks: () => ({type: SET_STOCKS} as const),
  indexingStocks: () => ({type: INDEXING_STOCKS} as const),
  updateMyStocks: (myStocks: myStockType[]) => ({type: UPDATE_MY_STOCKS, myStocks} as const),
  updateStocks: (stocks: stockType[]) => ({type: UPDATE_STOCKS, stocks} as const),
  sellStocks: (stock: myStockType, count: number) => ({type: SELL_STOCKS, stock, count} as const),

}

export type stockType = {
  title: string
  count: number
  risk: number
  price: number[]
  condition: 'up' | 'down'
  maxPrice: number
  minPrice: number
}
export type myStockType = {
  title: string
  price: number
  oldPrice: number
  count: number
  condition: 'up' | 'down'
}
type ActionType = InferActionsType<typeof stocksActions>