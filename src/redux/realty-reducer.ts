import { ThunkAction } from 'redux-thunk';
import home1 from './../img/realty/home-1.png';
import home10 from './../img/realty/home-10.png';
import home2 from './../img/realty/home-2.png';
import home3 from './../img/realty/home-3.png';
import home4 from './../img/realty/home-4.png';
import home5 from './../img/realty/home-5.png';
import home6 from './../img/realty/home-6.png';
import home7 from './../img/realty/home-7.png';
import home8 from './../img/realty/home-8.png';
import home9 from './../img/realty/home-9.png';
import { getRandomNumber } from './../utils/getRandomNumber';
import { AppStateType, InferActionsType } from "./store";

const GENERATE_ACTIVE_REALTY = 'realtyPage/GENERATE_ACTIVE_REALTY'
const DECREASE_REALTY_ATTEMPS = 'realtyPage/DECREASE_REALTY_ATTEMPS'
// const RESET_ACTIVE_REALTY = 'realtyPage/RESET_ACTIVE_REALTY'
const BUY_REALTY = 'realtyPage/BUY_REALTY'
const SET_MY_REALTY = 'realtyPage/SET_MY_REALTY'

let initialState = {
  activeRealty: {} as activeRealtyType,
  realtyList: [
    {
      title: 'Дом / 3 комн. / Стандарт',
      photo: home1
    },
    {
      title: 'Дом / 2 комн. / Стандарт',
      photo: home2
    },
    {
      title: 'Дом / 2 комн. / Модерн',
      photo: home3
    },
    {
      title: 'Дом / 4 комн. / Стандарт',
      photo: home4
    },
    {
      title: 'Коттедж / 5 комн. / Премиум',
      photo: home5
    },
    {
      title: 'Дом / 2 комн. / Гараж / Стандарт',
      photo: home6
    },
    {
      title: 'Дом / 3 комн. / Премиум',
      photo: home7
    },
    {
      title: 'Дом / 3 комн. / Гараж / Стандарт',
      photo: home8
    },
    {
      title: 'Дом / 3 комн. / Стандарт',
      photo: home9
    },
    {
      title: 'Летний дом / 4 комн. / Люкс',
      photo: home10
    }
  ],
  realtyRegion: {
    low: 'Трущобы',
    medium: 'Город',
    high: 'Элитный квартал'
  },
  realtyDemand: {
    'low': 'Маленький спрос',
    'medium': 'Средний спрос',
    'high': 'Высокий спрос'
  }, // чем выше спрос, тем большую цену можно завалить при продаже...
  realtyHistory: [] as activeRealtyType[],
  myRealty: [] as myRealtyType[],
}
export const realtyReducer = (state = initialState, action: RealtyActionsType): InitialRealtyStateType => {
  switch (action.type) {
    // создаем новое предложение по недвижимости
    case GENERATE_ACTIVE_REALTY:
      return {
        ...state,
        activeRealty: action.activeRealty,
        realtyHistory: [...state.realtyHistory, action.activeRealty]
      }
    case DECREASE_REALTY_ATTEMPS:
      return {
        ...state,
        activeRealty: {
          ...state.activeRealty,
          attempts: state.activeRealty.attempts - 1
        }
      }
    case BUY_REALTY:
      return {
        ...state,
        myRealty: [
          ...state.myRealty, 
          action.realty
        ],
        activeRealty: {
          ...state.activeRealty,
          isBought: true
        }
      }
    // case SET_MY_REALTY:
    //   return {
    //     ...state,
    //     myRealty: action.myRealty
    //   }
    default:
      return state
  }
}

export const realtyActions = {
  setActiveRealty: (activeRealty: activeRealtyType) => ({type: GENERATE_ACTIVE_REALTY, activeRealty} as const),
  decreaseRealtyAttempts: () => ({type: DECREASE_REALTY_ATTEMPS} as const),
  buyRealty: (realty: myRealtyType) => ({type: BUY_REALTY, realty} as const),
  // setMyRealty: (myRealty: realtyType[]) => ({type: SET_MY_REALTY, myRealty} as const)
}

export const generateActiveRealtyThunk = (): RealtyThunkType => (dispatch, getState) => {
  // копия списка доступной недвижимости...
  const realtyListCopy = [...getState().realtyPage.realtyList]
  // выбриаем рандомный индекс...
  const realtyIndex = getRandomNumber(realtyListCopy.length)
  // шанс для выпадение региона...
  const regionChance = getRandomNumber(100)
  const regionType: ChanceType = regionChance > 66 ? 'low' : regionChance > 33 ? 'medium' : 'high'
  // шанс для выпадения спроса...
  const demandChance = getRandomNumber(100)
  const demandType: ChanceType = demandChance > 66 ? 'low' : demandChance > 33 ? 'medium' : 'high'
  // цена недвижимости...
  const realtyPrice = regionType === 'high' 
    ? 40000 + getRandomNumber(40000) 
      : regionType === 'medium' 
        ? 20000 + getRandomNumber(20000) 
        : 10000 + getRandomNumber(10000)
  // размер первого депозита...
  const realtyDeposit = Math.floor(realtyPrice * (15 + getRandomNumber(15)) / 100)
  // размер дохода...
  const realtyIncome = Math.floor(realtyPrice * (5 + getRandomNumber(5)) / 100)
  // процент платы по закладной (может поменятся в зависимости от цены недвижимости...)
  const realtyPaymentPercentage = 5 + getRandomNumber(5)
  // создаем новый объект новости...
  const activeRealty: activeRealtyType = {
    title: realtyListCopy[realtyIndex].title,
    region: regionType,
    demand: demandType,
    price: realtyPrice,
    deposit: realtyDeposit,
    income: realtyIncome,
    paymentPercentage: realtyPaymentPercentage,
    satisfaction: Number((0.6 + getRandomNumber(0.4)).toFixed(2)), // удовлетворенность  продажей...
    attempts: 3, // колисество попыток чтобы потогроватся...
    isBought: false, // куплена ли недвижимость...
    photo: realtyListCopy[realtyIndex].photo
  }

  dispatch(realtyActions.setActiveRealty(activeRealty))
}
export const buyRealtyThunk = (price: number): RealtyThunkType => (dispatch, getState) => {
  const activeRealtyCopy = getState().realtyPage.activeRealty

  const myRealty: myRealtyType = {
    title: activeRealtyCopy.title,
    region: activeRealtyCopy.region,
    demand: activeRealtyCopy.demand,
    photo: activeRealtyCopy.photo,
    price,
    income: activeRealtyCopy.income,
    payment: price * activeRealtyCopy.paymentPercentage / 100,
    mortgage: activeRealtyCopy.price - activeRealtyCopy.deposit
  }
  
  dispatch(realtyActions.buyRealty(myRealty))
}
export type InitialRealtyStateType = typeof initialState
export type RealtyActionsType = InferActionsType<typeof realtyActions>
export type RealtyThunkType = ThunkAction<any, AppStateType, unknown, RealtyActionsType>
export interface activeRealtyType {
  title: string
  region: ChanceType
  demand: ChanceType
  deposit: number
  price: number
  income: number
  paymentPercentage: number
  photo: string
  attempts: number
  satisfaction: number
  isBought: boolean
}
export interface myRealtyType {
  title: string // название недвижимости...
  region: ChanceType // уровень региона...
  photo: string // фото
  demand: ChanceType // спрос на недвижимость
  price: number // цена за которую был куплен дом...
  mortgage: number // размер закладной...
  payment: number // плата по закладной...
  income: number // доход с жилья...
}
export type ChanceType = 'low' | 'medium' | 'high'
/*
//region: трущобы / город / элитный район / элитын
//demand: слабый / средний / высокий / спрос
// возможность торговли (до 3х раз)
// скосить цену можно на 10-
вы можете купить недвижимость по пониженной цене...
от спроса будет зависеть, с какой вероятностью ваш дом захотят купить...
от квартала будет зависеть как сильно вы сможете завысить цену...

будем генерировать доход, задаток и полную цену
плата по закладной может быть больше / меньше чем доход с дома...

1 - мы покупаем дом и вносим задаток
2 - мы платим процент по закладной каждый месяц
3 - дом приносит ежемесячную прибыль 
4 - может появится возможность продать дом,
 если в новостях вдруг появится предложение

*/