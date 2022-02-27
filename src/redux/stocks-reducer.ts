import { ThunkAction } from 'redux-thunk';
import { getRandomNumber } from './../utils/getRandomNumber';
import { updateIncome } from './profile-reducer';
import { AppStateType, InferActionsType } from "./store";

const SET_STOCKS = 'gamePage/SET_STOCKS'
const SELL_STOCKS = 'gamePage/SELL_STOCKS'
const UPDATE_MY_STOCKS = 'gamePage/UPDATE_MY_STOCKS'
const UPDATE_STOCKS = 'gamePage/UPDATE_STOCKS'
const INDEXING_STOCKS = 'gamePage/INDEXING_STOCKS'
const SET_PRICE_CHANGE_INTERVAL = 'gamePage/SET_PRICE_CHANGE_INTERVAL'
const RESET_MY_STOCKS = 'gamePage/RESET_MY_STOCKS'

const FILTER_STOCKS = 'gamePage/FILTER_STOCKS'
const REVERSE_FILTERED_STOCKS = 'gamePage/REVERSE_FILTERED_STOCKS'

const FILTER_BONDS = 'gamePage/FILTER_BONDS'
const REVERSE_FILTERED_BONDS = 'gamePage/REVERSE_FILTERED_BONDS' 

const SET_NEW_STOCKS = 'gamePage/SET_NEW_STOCKS'
const SET_INSTRUCTION_COMPLETED = 'gamePage/SET_INSTRUCTION_COMPLETED'
const SET_BROKERS = 'gamePage/SET_BROKERS'
const UPDATE_BROKERS_STOCKS_COUNT = 'gamePage/UPDATE_BROKERS_STOCKS_COUNT'
const INDEX_STOCKS_SUMMARY_PRICE = 'gamePage/INDEX_STOCKS_SUMMARY_PRICE'

const SET_BONDS = 'gamePage/SET_BONDS' 
const INDEXING_BONDS = 'gamePage/INDEXING_BONDS'
const SET_MARGIN = 'gamePage/SET_MARGIN'
const DISCREASE_MARGIN_TIME = 'gamePage/DISCREASE_MARGIN_TIME'
const ADD_MARGIN_PENALTY = 'gamePage/ADD_MARGIN_PENALTY'
const MARGIN_PAYBACK = 'gamePage/MARGIN_PAYBACK'

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
  // список названий под облигаци...
  companiesForBonds: [
    'ЗАО ГосСтрой', 'ОАО МашинСервис', 'ОАО ВкуснаяЕда',
    'ЗАО ЧистаяЭнергия', 'ЗданиеСтрой', 'ЗАО БыстрыйТранспорт'
  ],
  // акции в портфеле . . .
  myStocks: [] as myStockType[],
  // общая цена портфеля игрока...
  stocksSummaryPrice: 0,
  // подписка, благодаяря которой можно видеть риски акций...
  isSubscriptionBought: false,
  //
  isInstructionCompleted: false,
  // акции на рынке . . .
  stocks: [] as stockType[],
  //
  bonds: [] as BondType[],
  // отфильтрованнае акции . . .
  filteredStocks: [] as stockType[],
  //
  filteredBonds: [] as BondType[],
  // брокеры для маржинальной торговли...
  brokersNames: [
    'Bill Nadsman', 
    'George Williams', 
    'Neil Dragsman', 
    'Ed Paulson'
  ],
  // массив брокеров, которые могут предложить маржинальную торговлю...
  brokers: [] as brokerType[],
  // плата за перенос...
  penaltyPay: [
    {summary: 10000, penalty: 150},
    {summary: 25000, penalty: 250},
    {summary: 50000, penalty: 450},
    {summary: 100000, penalty: 800},
  ],
  //
  margin: [] as MarginType[]
}

export type InitialStocksStateType = typeof initialState

export const stocksReducer = (state = initialState, action: ActionType): InitialStocksStateType => {
  switch (action.type) {
    // TODO в идеале должно быть несколько видов акций ( до $100 ; до $250 ; до $500
    //  которые будут открываться с ростом доходов и портфеля игрока . . .
    // первое создание акций . . .
    case SET_STOCKS:
      // копия массива с акциями . . .
      let initialStocksCopy = [...state.stocks]
      state.companiesForStocks.forEach(company => {
        // генерируем риск . . .
        let risk = Number((Math.random() * 4 + 1).toFixed(0))
        // генерируем цену . . .
        let price = Number((Math.random() * 230 + 15).toFixed(1))

        let dividendsPercentage = 0
        // шанс того, что акция будет девидендной ~ 35%
        if (Number((Math.random()).toFixed(2)) < 0.35) {
          // выплата девидендов = 1 - 4% стоимости акции...
          dividendsPercentage = Math.round(Math.random() * state.normalPriceChange) + 2
        }

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
          // процент девидендов
          dividendsPercentage: dividendsPercentage,
          // выплата с девиденда
          dividendsAmount: Number((dividendsPercentage * price / 100).toFixed(2)),
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
      console.log(action.stock)

      let myStocksCopyToSell = [...state.myStocks]
      let stocksCopyToSell = [ ...state.stocks ]
      let filteredStocksCopyToSell = [ ...state.filteredStocks ]

      // обновляем количество акций в нашем портфеле...
      myStocksCopyToSell[action.activeStock] = {
        ...myStocksCopyToSell[action.activeStock],
        count: myStocksCopyToSell[action.activeStock].count - action.count
      }
      // обновляем количество акций на бирже...
      stocksCopyToSell.forEach((s, i) => {
        if (s.title === action.stock.title) 
          stocksCopyToSell[i] = {...stocksCopyToSell[i], count: stocksCopyToSell[i].count + action.stock.count }
      })
      // обновляем количество акций в фильтре...
      filteredStocksCopyToSell.forEach((s, i) => {
        if (s.title === action.stock.title) 
        filteredStocksCopyToSell[i] = {...filteredStocksCopyToSell[i], count: filteredStocksCopyToSell[i].count + action.stock.count }
      })


      if(myStocksCopyToSell[action.activeStock].count === 0) {
        myStocksCopyToSell.splice(action.activeStock, 1)
      }

      return {
        ...state,
        myStocks: [...myStocksCopyToSell],
        stocks: [...stocksCopyToSell],
        filteredStocks: [...filteredStocksCopyToSell]
      }
    // изменение цен на акции . . .
    case INDEXING_STOCKS:
      let stocksCopy = [...state.stocks]
      let myStocksCopy = [...state.myStocks]
      let filteredIndexingStocksCopy = [...state.filteredStocks]

      state.stocks.forEach((stock, index) => {
        // изменение количества акций . . .
        let indexCount = Number((getRandomNumber(10) - state.normalPriceChange).toFixed(0))
        // изменение состояния акций при условии, что она не подвежена новостям . . .
        let indexCondition: 'up' | 'down' = stock.condition

        if (stock.priceChangeInterval === 0) {
          indexCondition = getRandomNumber(10) >= (state.normalPriceChange - 1 + stock.risk) ? 'up' : 'down'
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
          ],
          // новые выплаты с девидендов . . .
          dividendsAmount: Number((stocksCopy[index].dividendsPercentage * indexPrice / 100).toFixed(2))

        }

        // обновление цены в портфеле игрока . . .
        myStocksCopy.forEach((myStock, i) => {
          if(myStock.title === stock.title) {
            let price = indexPrice
            myStocksCopy[i] = {
              ...myStocksCopy[i],
              // new stock price
              price: price,
              // new stock condition / up / down
              condition: price >= myStocksCopy[i].oldPrice ? 'up' : 'down',
              // new dividend price
              // dividendsAmount: stock.dividendsAmount,
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
      stocksPriceChangeCopy.forEach((stock, index) => {
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

        case "dividends":
          filteredStocksCopy = state.stocks.sort((prev, next) => next.dividendsPercentage - prev.dividendsPercentage)
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
    
    case FILTER_BONDS:

      let filteredBondsCopy = [] as BondType[]

      switch (action.filter) {
        case "title":
          if (action.value === '') {
            filteredBondsCopy = [...state.bonds]
          } else {
            state.bonds.forEach(bond => {
              if (bond.title.includes(action.value) || bond.title.toLowerCase().includes(action.value)) filteredBondsCopy = [...filteredBondsCopy, bond]})
          }
          break

        case "condition":
          filteredBondsCopy = state.filteredBonds.sort((prev, next) => {
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
          filteredBondsCopy = state.bonds.sort((prev, next) => prev.price[prev.price.length - 1] - next.price[next.price.length - 1])
          break

        case "count":
          filteredBondsCopy = state.bonds.sort((prev, next) => prev.count - next.count)
          break

        case "risk":
          filteredBondsCopy = state.bonds.sort((prev, next) => prev.risk - next.risk)
          break

        case "dividends":
          filteredBondsCopy = state.bonds.sort((prev, next) => next.dividendsPercentage - prev.dividendsPercentage)
          break

        case "none":
          filteredBondsCopy = [...state.bonds]
          break

        default:
          break
      }

      return {
        ...state,
        filteredBonds: [...filteredBondsCopy]
      }
    // изменить последовательность . . .
    case REVERSE_FILTERED_STOCKS:
      return {
        ...state,
        filteredStocks: [...state.filteredStocks.reverse()]
      }

    case REVERSE_FILTERED_BONDS:
      return {
        ...state,
        filteredBonds: [...state.filteredBonds.reverse()]
      }

    case SET_NEW_STOCKS:
      return {
        ...state,
        stocks: action.newStocks,
        myStocks: action.newMyStocks
      }

    case SET_BROKERS:

      let brokersCopy = [ ...state.brokers ]
      let stocks = [ ...state.stocks ]

      state.brokersNames.forEach(name => {

        // let stockInCase = 
        // // TODO доработать
        // Array.from(Array(getRandomNumber(state.normalPriceChange) + 2).fill(''), (s,i) => {return i})
        let stocksCount = getRandomNumber(3) + 2
        let marginStocks: stockType[] = []

        for (let i = 0; i < stocksCount; i++) {
          let randomStockIndex = getRandomNumber(stocks.length)
          let randomAmount = getRandomNumber(1000) + 100
          let marginStock = {
            ...stocks[randomStockIndex],
            count: randomAmount
          }
          marginStocks = [...marginStocks, marginStock]
        }
        
        let broker = {
          name: name,
          age: 20 + getRandomNumber(30),
          // коммиссия которую выплачивает игрок, после расчета прибыли / убыдка...
          commission: (2 + getRandomNumber(5) ) / 100,
          // минимальое кредитное плечо
          leverAgeMin: 2,
          // максимальное кредитное плечо
          leverAgeMax: Number((0.5 - getRandomNumber(49) / 100).toFixed(2)),
          // минимальный срок выдачи ...
          timeMin: 1,
          // максимальный срок выдачи...
          timeMax: 3 + getRandomNumber(4),
          //
          stocks: marginStocks
        }
        //@ts-ignore
        brokersCopy.push(broker)
      })

      return {
        ...state,
        brokers: brokersCopy
      } 
      
    case UPDATE_BROKERS_STOCKS_COUNT:
      return {
        ...state,
        brokers: action.brokers
      }  

    case INDEX_STOCKS_SUMMARY_PRICE:
      return {
        ...state,
        stocksSummaryPrice: state.myStocks.reduce((total, stock) => {
          total += stock.price*stock.count
          return total
        }, 0 )
      }  

    case SET_BONDS:

      let bondsCopy: BondType[] = [...state.bonds]
      // количество облигаций...
      let count = Array.from(Array(getRandomNumber(10) + 10).fill({}), (item, index) => {return index})
      count.forEach((s,index) => {
        // создаем имя для облигации
        const price = getRandomNumber(600) + 650
        const risk = getRandomNumber(4) + 1
        const percentage = getRandomNumber(7) + 8
        let title = getRandomNumber(10) > 5 
          ? 'ОФЗ ' + 
          String((getRandomNumber(10) + 10)) + 
          '-' + 
          String(getRandomNumber(1000)+1000) +
          ' ' + 
          state.companiesForBonds[getRandomNumber(state.companiesForBonds.length)] 
        : state.companiesForBonds[getRandomNumber(state.companiesForBonds.length)] +
          ' выпуск ' + String(getRandomNumber(20) + 1)

        // create a bond object...
        let bond: BondType = {
          title: title,
          count: getRandomNumber(20) + 10,
          risk: risk,
          price: [price],
          condition: getRandomNumber(10) > 5 ? 'up' : 'down',
          dividendsPercentage: percentage,
          dividendsAmount: percentage * price / 100
        }
        // push bond to array...
        bondsCopy.push(bond)
      })
      return {
        ...state,
        bonds: bondsCopy,
        filteredBonds: bondsCopy
      }

    case INDEXING_BONDS:
      let indexingBondsCopy: BondType[] = [...state.bonds]
      let indexingMyStocksCopy = [...state.myStocks]
      let indexingFilteredBonds = [...state.filteredBonds]

      state.bonds.forEach((bond, index) => {
        // bond new condition...
        let indexCondition: 'up' | 'down' = getRandomNumber(10) >= (state.normalPriceChange - 1 + bond.risk) ? 'up' : 'down'
        // indexing bond count...
        let indexCount = Number((getRandomNumber(10) - state.normalPriceChange).toFixed(0))
        // bond price multiplier...
        let indexPriceCount = Number((bond.risk * Number((Math.random() + 0.1).toFixed(1))).toFixed(1))
        // bond new price depends on condition and multiplier...
        let indexPrice: number = indexCondition === 'up'
          ? bond.price[bond.price.length - 1] + indexPriceCount
          : bond.price[bond.price.length - 1] - indexPriceCount
        // price round...
        indexPrice = Number(indexPrice.toFixed(1))    

        indexingBondsCopy[index] = {
          // возвращаем пред. данные . . .
          ...indexingBondsCopy[index],
          // новое состояние роста акции . . .
          condition: indexCondition,
          // новое количество акций . . .
          count: indexingBondsCopy[index].count + indexCount > 0
            ? indexingBondsCopy[index].count + indexCount
            : indexingBondsCopy[index].count,
          // новая цена акции . . .
          price: [
            ...indexingBondsCopy[index].price,
            indexPrice
          ],
          // новые выплаты с девидендов . . .
          dividendsAmount: Number((indexingBondsCopy[index].dividendsPercentage * indexPrice / 100).toFixed(2))
      }

      // обновление цены в портфеле игрока . . .
      indexingMyStocksCopy.forEach((myStock, i) => {
        if(myStock.title === bond.title) {

          let price = indexPrice
          
          indexingMyStocksCopy[i] = {
            ...indexingMyStocksCopy[i],
            // new stock price
            price: price,
            // new stock condition / up / down
            condition: price >= indexingMyStocksCopy[i].oldPrice ? 'up' : 'down',
            // new dividend price
            dividendsAmount: indexingBondsCopy[index].dividendsAmount,
          }
        }
      })

      indexingFilteredBonds.forEach((fStock, fIndex) => {
        if (fStock.title === bond.title) {
          indexingFilteredBonds[fIndex] = indexingBondsCopy[index]
        }
      })
      
    })

      return {
        ...state,
        bonds: [...indexingBondsCopy],
        myStocks: [...indexingMyStocksCopy],
        filteredBonds: [...indexingFilteredBonds]
      }
    
    case SET_INSTRUCTION_COMPLETED:
      return {
        ...state,
        isInstructionCompleted: true
      }

    case SET_MARGIN:
      return {
        ...state,
        margin: [...state.margin, action.activeMargin]
      }  

    case ADD_MARGIN_PENALTY:
      return {
        ...state,
        margin: state.margin.map(margin => {
          return {
            ...margin,
            currentPenalty: margin.currentPenalty + margin.penaltyPay
          }
        })
      }

    case DISCREASE_MARGIN_TIME:
      return {
        ...state,
        margin: state.margin.map(margin => {
          return {
            ...margin,
            expiresIn: margin.expiresIn - 1
          }
        })
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
  reverseFilteredStocks: () => ({type: REVERSE_FILTERED_STOCKS} as const),
  
  filterBonds: (filter: filterType, value: string) => ({type: FILTER_BONDS, filter, value} as const),
  reverseFilteredBonds: () => ({type: REVERSE_FILTERED_BONDS} as const),

  setNewStocks: (newStocks: stockType[], newMyStocks: myStockType[]) => ({type: SET_NEW_STOCKS, newStocks, newMyStocks} as const),
  setInstructionCompleted: () => ({type: SET_INSTRUCTION_COMPLETED} as const),
  setBrokers: () => ({type: SET_BROKERS} as const),
  updateBrokerStocksCount: (brokers: brokerType[]) => ({type: UPDATE_BROKERS_STOCKS_COUNT, brokers} as const),
  indexStocksSummaryPrice: () => ({ type: INDEX_STOCKS_SUMMARY_PRICE } as const),
  // создаем список облигаций..
  setBonds: () => ({type: SET_BONDS} as const),
  // добавляем обязанность по марже...
  setMargin: (activeMargin: MarginType) => ({type: SET_MARGIN, activeMargin} as const),
  addMarginPenalty: () => ({type: ADD_MARGIN_PENALTY} as const),
  dicreseMarginTime: () => ({type: DISCREASE_MARGIN_TIME} as const),
  // обновляем цену на облигацию...
  indexingBonds: () => ({type: INDEXING_BONDS} as const)
}

export const addStocksToPortfolioThunk = (stock: stockType, count: number):ActionThunkType => (dispatch, getState) => {
  let myStocksCopy = [ ...getState().stocksPage.myStocks ]

  let newStock: myStockType = {
    title: stock.title,
    price: stock.price[stock.price.length - 1],
    count: count,
    oldPrice: stock.price[stock.price.length - 1],
    condition: stock.condition,
    dividendsAmount: stock.dividendsAmount
  }
  if (myStocksCopy.some(s => s.title === newStock.title)) {
    // если у нас уже есть акции данной компании то мы добавляем их в позицию и усредняем цену...
    //TODO доразобаца в проблеме...
    myStocksCopy = myStocksCopy.map((stock, index) => {
      if (stock.title === newStock.title) {
        let oldPrice = Number(((stock.count * stock.oldPrice + newStock.count * newStock.oldPrice) / (stock.count + newStock.count)).toFixed(1))
        return {
          ...stock,
          count: stock.count + newStock.count,
          oldPrice: oldPrice,
          condition: stock.price >= oldPrice ? 'up' : 'down',
        }
      }
      return stock
    })
  } else {
    myStocksCopy = [ ...myStocksCopy, newStock ]
  }

  // update player porfolio...
  dispatch(stocksActions.updateMyStocks(myStocksCopy))
  // indexing new portfolio summar price...
  dispatch(stocksActions.indexStocksSummaryPrice())
  // updating player income (devidents amount?)
  dispatch(updateIncome())
}
export const updateBrokerStocksCountThunk = (broker: brokerType, count: number, stockTitle: string): ActionThunkType => (dispatch, getState) => {
  let brokersCopy = [ ...getState().stocksPage.brokers ]

  brokersCopy.forEach((b, index) => {
    if (b.name === broker.name) {
      b.stocks.forEach((s, i) => {
        if (s.title === stockTitle) {
          brokersCopy[index].stocks[i].count = brokersCopy[index].stocks[i].count - count
        }
      })
    }
  })
  dispatch(stocksActions.updateBrokerStocksCount(brokersCopy))
}
export const addMarginToPortfolioThunk = (stock: stockType, broker: brokerType , count: number, time: number): ActionThunkType => (dispatch, getState) => {
  let currentDay = getState().gamePage.daysInMonth // day, when player take margin
  let currentMount = getState().gamePage.month // month index, when player take margin

  const price = Math.floor(count * stock.price[stock.price.length - 1])
  const penaltyPay = [ ...getState().stocksPage.penaltyPay ]

  let penalty = penaltyPay.reverse().reduce((total, p) => {
    if (price < p.summary) total = p.penalty
    return total
  }, 0.006 * price) // if price > 100000$ we will pay 0.6% of this price...

  let newMargin: MarginType = {
    expiresIn: time, // time to giveBack...
    commision: broker.commission, // payOut commision...
    brokerName: broker.name, // broker name...
    penaltyPay: penalty, 
    currentPenalty: penalty,
    giveBackData: {
      day: currentDay,
      month: currentMount + time > 12 
        ? time - (12 - currentMount) 
        : currentMount + time // giveBack data
    },
    stockTitle: stock.title, // stock title
    stockPrice: stock.price[stock.price.length - 1], // stock price
    stockCount: count // stock count
  }

  dispatch(stocksActions.setMargin(newMargin))

}
export const marginPayOutThunk = (): ActionThunkType => (dispatch, getState) => {
  if (getState().stocksPage.margin.length > 0) {
    let marginCopy = getState().stocksPage.margin[0]

    let currentDay = getState().gamePage.daysInMonth // day, when player take margin
    let currentMount = getState().gamePage.month // month index, when player take margin

    if(marginCopy.giveBackData.day === currentDay && marginCopy.expiresIn > 0) {
      dispatch(stocksActions.dicreseMarginTime())
    } else {
      if (marginCopy.expiresIn === 0) {
        // penaltyPay...
        dispatch(stocksActions.addMarginPenalty())
      }
    }
  }
}
export type stockType = {
  title: string
  count: number
  risk: number
  price: number[]
  condition: 'up' | 'down'
  priceChangeInterval: number
  dividendsPercentage: number
  dividendsAmount: number
  maxPrice: number
  minPrice: number
}
export type BondType = {
  title: string
  count: number
  risk: number
  price: number[]
  condition: 'up' | 'down'
  dividendsPercentage: number
  dividendsAmount: number
}
export type myStockType = {
  title: string
  price: number
  oldPrice: number
  count: number
  condition: 'up' | 'down'
  dividendsAmount: number
}
export type brokerType = {
  name: string
  age: number
  commission: number
  leverAgeMin: number
  leverAgeMax: number
  timeMin: number
  timeMax: number
  stocks: stockType[]
}
export type marginStockType = {
  expiresIn: number
  count: number
  startPrice: number
}
// виды фильтров . . .
export type filterType = 'price' | 'condition' | 'title' | 'count' | 'none' | 'risk' | 'dividends'

type MarginType = {
  expiresIn: number
  commision: number
  brokerName: string
  penaltyPay: number
  currentPenalty: number
  giveBackData: {
    day: number
    month: number
  }
  stockTitle: string
  stockPrice: number
  stockCount: number
}

export type ActionType = InferActionsType<typeof stocksActions>
type ActionThunkType = ThunkAction<any, AppStateType, unknown, ActionType>