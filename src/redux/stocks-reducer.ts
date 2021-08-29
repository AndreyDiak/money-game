import {InferActionsType} from "./store";

const SET_STOCKS = 'gamePage/SET_STOCKS'
const SELL_STOCKS = 'gamePage/SELL_STOCKS'
const UPDATE_MY_STOCKS = 'gamePage/UPDATE_MY_STOCKS'
const UPDATE_STOCKS = 'gamePage/UPDATE_STOCKS'
const INDEXING_STOCKS = 'gamePage/INDEXING_STOCKS'
const SET_PRICE_CHANGE_INTERVAL = 'gamePage/SET_PRICE_CHANGE_INTERVAL'
const RESET_MY_STOCKS = 'gamePage/RESET_MY_STOCKS'
const FILTER_STOCKS = 'gamePage/FILTER_STOCKS'
const REVERSE_FILTERED_STOCKS = 'gamePage/REVERSE_FILTERED_STOCKS'
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
    'ЗАО ПлодЛюбви', 'ОАО ТенЗдоровье',
    'СтройДвор', 'АвтоМаркет', 'ИнтернетСервис',
    'ОАО ЭкмоСеть', 'ОАО БыстраяДоставка', 'АэроТехнологии',
    'ОАО НаСвязи',
  ],
  // акции в портфеле . . .
  myStocks: [] as myStockType[],
  // акции на рынке . . .
  stocks: [] as stockType[],
  // отфильтрованнае акции . . .
  filteredStocks: [] as stockType[],
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
          // должна ли рости акции всвязи с новостями . . .
          priceChangeInterval: 0,
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
        stocks: initialStocksCopy,
        filteredStocks: initialStocksCopy
      }
    // продажа акций . . .
    case SELL_STOCKS:
      let myStocksCopyToSell = [...state.myStocks]

      myStocksCopyToSell[action.activeStock] = {
        ...myStocksCopyToSell[action.activeStock],
        count: myStocksCopyToSell[action.activeStock].count - action.count
      }

      if(myStocksCopyToSell[action.activeStock].count === 0) {
        myStocksCopyToSell.splice(action.activeStock, 1)
      }


      return {
        ...state,
        myStocks: myStocksCopyToSell
      }
    // изменение цен на акции . . .
    case INDEXING_STOCKS:
      let stocksCopy = [...state.stocks]
      let myStocksCopy = [...state.myStocks]
      let filteredIndexingStocksCopy = [...state.filteredStocks]

      state.stocks.map((stock, index) => {
        // изменение количества акций . . .
        let indexCount = Number((Math.random() * 10 - 4).toFixed(0))
        // изменение состояния акций при условии, что она не подвежена новостям . . .
        let indexCondition: 'up' | 'down' = stock.condition

        if (stock.priceChangeInterval === 0) {
          indexCondition = Math.random() * 10 >= (state.normalPriceChange - 1 + stock.risk) ? 'up' : 'down'
        }
        // изменение цены акции . . .
        let indexPriceCount = Number((stock.risk * Number((Math.random() + 0.1).toFixed(1))).toFixed(1))

        let indexPrice: number = indexCondition === 'up'
          ? stock.price[stock.price.length - 1] + indexPriceCount
          : stock.price[stock.price.length - 1] - indexPriceCount

        indexPrice = Number(indexPrice.toFixed(1))

        if (indexPrice <= 0) {
          indexPrice = stock.price[stock.price.length - 1]
          stocksCopy[index].priceChangeInterval = Math.round(Math.random() * 3 + 1)
          indexCondition = 'up'
        }

        stocksCopy[index] = {
          // возвращаем пред. данные . . .
          ...stocksCopy[index],
          // новое состояние роста акции . . .
          condition: indexCondition,
          // новое количество акций . . .
          count: stocksCopy[index].count + indexCount > 0
            ? stocksCopy[index].count + indexCount
            : stocksCopy[index].count,
          // обновляем сроки зависимости роста акции от новостей
          priceChangeInterval: stocksCopy[index].priceChangeInterval > 0
            ? stocksCopy[index].priceChangeInterval -1
            : stocksCopy[index].priceChangeInterval,
          // новая цена акции . . .
          price: [
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

        filteredIndexingStocksCopy.forEach((fStock, fIndex) => {
          if (fStock.title === stock.title) {
            filteredIndexingStocksCopy[fIndex] = stocksCopy[index]
          }
        })

      })
      // console.log('================================')
      // console.log('обновленные акции')
      // console.log(stocksCopy)
      return {
        ...state,
        stocks: stocksCopy,
        myStocks: myStocksCopy,
        filteredStocks: filteredIndexingStocksCopy
      }
    // обновление цен наших акций . . .
    case SET_PRICE_CHANGE_INTERVAL:
      let stocksPriceChangeCopy = [...state.stocks]
      stocksPriceChangeCopy.map((stock, index) => {
        // находим нужную акцию
        // сетаем кол-во недель и тип роста
        if (stock.title === action.company) {
          console.log(stock)
          stocksPriceChangeCopy[index] = {
            ...stock,
            condition: action.condition,
            priceChangeInterval: action.timeInterval
          }
        }
      })
      return {
        ...state,
        stocks: stocksPriceChangeCopy
      }
    // сет моих акций . . .
    case UPDATE_MY_STOCKS:
      return {
        ...state,
        myStocks: action.myStocks
      }
    // обновление акций . . .
    case UPDATE_STOCKS:
      return {
        ...state,
        stocks: action.stocks,
        filteredStocks: action.filteredStocks
      }
    // обнуление акций персонажа . . .
    case RESET_MY_STOCKS:
      return {
        ...state,
        myStocks: [] as myStockType[]
      }
    // фильтр акций . . .
    case FILTER_STOCKS:
      let filteredStocksCopy = [] as stockType[]

      switch (action.filter) {
        case "title":
          if (action.value === '') {
            filteredStocksCopy = [...state.stocks]
          } else {
            state.stocks.forEach(stock => {
              if (stock.title.includes(action.value) || stock.title.toLowerCase().includes(action.value)) filteredStocksCopy = [...filteredStocksCopy, stock]})
          }
          break

        case "condition":
          filteredStocksCopy = state.filteredStocks.sort((prev, next) => {
            if (prev.condition === 'up' && next.condition === 'down') {
              return -1
            }
            if (prev.condition === 'down' && next.condition === 'up') {
              return 1
            }
            return 0
          })
          break

        case "price":
          filteredStocksCopy = state.stocks.sort((prev, next) => prev.price[prev.price.length - 1] - next.price[next.price.length - 1])
          break

        case "count":
          filteredStocksCopy = state.stocks.sort((prev, next) => prev.count - next.count)
          break

        case "risk":
          filteredStocksCopy = state.stocks.sort((prev, next) => prev.risk - next.risk)
          break

        case "none":
          filteredStocksCopy = [...state.stocks]
          break

        default:
          break
      }

      return {
        ...state,
        filteredStocks: filteredStocksCopy
      }
    // изменить последовательность . . .
    case REVERSE_FILTERED_STOCKS:
      return {
        ...state,
        filteredStocks: [...state.filteredStocks.reverse()]
      }
    default:
      return state
  }
}

export const stocksActions = {

  setStocks: () => ({type: SET_STOCKS} as const),
  indexingStocks: () => ({type: INDEXING_STOCKS} as const),
  updateMyStocks: (myStocks: myStockType[]) => ({type: UPDATE_MY_STOCKS, myStocks} as const),
  updateStocks: (stocks: stockType[], filteredStocks: stockType[]) => ({type: UPDATE_STOCKS, stocks, filteredStocks} as const),
  sellStocks: (stock: myStockType, count: number, activeStock: number) => ({type: SELL_STOCKS, stock, count, activeStock} as const),
  setPriceChangeInterval: (company: string, timeInterval: number, condition: 'up' | 'down') => ({type: SET_PRICE_CHANGE_INTERVAL, company, timeInterval, condition} as const),
  resetMyStocks: () => ({type: RESET_MY_STOCKS} as const),
  filterStocks: (filter: filterType, value: string) => ({type: FILTER_STOCKS, filter, value} as const),
  reverseFilteredStocks: () => ({type: REVERSE_FILTERED_STOCKS} as const)

}

export type stockType = {
  title: string
  count: number
  risk: number
  price: number[]
  condition: 'up' | 'down'
  priceChangeInterval: number
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
// виды фильтров . . .
export type filterType = 'price' | 'condition' | 'title' | 'count' | 'none' | 'risk'
type ActionType = InferActionsType<typeof stocksActions>