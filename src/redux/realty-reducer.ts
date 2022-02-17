import home1 from './../img/realty/home-1.png'
import home2 from './../img/realty/home-2.png'
import home3 from './../img/realty/home-3.png'
import home4 from './../img/realty/home-4.png'
import home5 from './../img/realty/home-5.png'
import home6 from './../img/realty/home-6.png'
import home7 from './../img/realty/home-7.png'
import home8 from './../img/realty/home-8.png'
import home9 from './../img/realty/home-9.png'
import home10 from './../img/realty/home-10.png'
import {InferActionsType} from "./store";

const GENERATE_ACTIVE_REALTY = 'realtyPage/GENERATE_ACTIVE_REALTY'
const RESET_ACTIVE_REALTY = 'realtyPage/RESET_ACTIVE_REALTY'
const BUY_REALTY = 'realtyPage/BUY_REALTY'
const SET_MY_REALTY = 'realtyPage/SET_MY_REALTY'

let initialState = {
  activeRealty: null as null | realtyType,
  realty: [
    {
      title: 'Дом / 3 комн. / Стандарт',
      deposit: 5000, // первый задаток за дом
      price: 40000, // полная цена дома
      payment: 240, // месячный доход с дома
      photo: home1
    },
    {
      title: 'Дом / 2 комн. / Стандарт',
      deposit: 4500, // первый задаток за дом
      price: 30000, // полная цена дома
      payment: 210, // месячный доход с дома
      photo: home2
    },
    {
      title: 'Дом / 2 комн. / Модерн',
      deposit: 5200, // первый задаток за дом
      price: 43000, // полная цена дома
      payment: 260, // месячный доход с дома
      photo: home3
    },
    {
      title: 'Дом / 4 комн. / Стандарт',
      deposit: 5100, // первый задаток за дом
      price: 42000, // полная цена дома
      payment: 250, // месячный доход с дома
      photo: home4
    },
    {
      title: 'Коттедж / 5 комн. / Премиум',
      deposit: 8000, // первый задаток за дом
      price: 60000, // полная цена дома
      payment: 370, // месячный доход с дома
      photo: home5
    },
    {
      title: 'Дом / 2 комн. / Гараж / Стандарт',
      deposit: 6000, // первый задаток за дом
      price: 48000, // полная цена дома
      payment: 270, // месячный доход с дома
      photo: home6
    },
    {
      title: 'Дом / 3 комн. / Премиум',
      deposit: 6000, // первый задаток за дом
      price: 50000, // полная цена дома
      payment: 300, // месячный доход с дома
      photo: home7
    },
    {
      title: 'Дом / 3 комн. / Гараж / Стандарт',
      deposit: 6500, // первый задаток за дом
      price: 54000, // полная цена дома
      payment: 330, // месячный доход с дома
      photo: home8
    },
    {
      title: 'Дом / 3 комн. / Стандарт',
      deposit: 4800, // первый задаток за дом
      price: 35000, // полная цена дома
      payment: 250, // месячный доход с дома
      photo: home9
    },
    {
      title: 'Летний дом / 4 комн. / Люкс',
      deposit: 10000, // первый задаток за дом
      price: 75000, // полная цена дома
      payment: 400, // месячный доход с дома
      photo: home10
    },
  ] as realtyType[],
  myRealty: [
  ] as realtyType[],
}

export const realtyReducer = (state = initialState, action: RealtyActionsType): InitialRealtyStateType => {
  switch (action.type) {
    // создаем новое предложение по недвижимости
    case GENERATE_ACTIVE_REALTY:
      return {
        ...state,
        activeRealty: state.realty[Math.floor(Math.random() * state.realty.length)]
      }
    // обнуляем предложение по недвижимости
    case RESET_ACTIVE_REALTY:
      return {
        ...state,
        activeRealty: null
      }
    case BUY_REALTY:
      return {
        ...state,
        myRealty: [...state.myRealty, state.activeRealty] as realtyType[],
        activeRealty: null
      }
    case SET_MY_REALTY:
      return {
        ...state,
        myRealty: action.myRealty
      }
    default:
      return state
  }
}

export const realtyActions = {
  generateActiveRealty: () => ({type: GENERATE_ACTIVE_REALTY} as const),
  resetActiveRealty: () => ({type: RESET_ACTIVE_REALTY} as const),
  buyRealty: () => ({type: BUY_REALTY} as const),
  setMyRealty: (myRealty: realtyType[]) => ({type: SET_MY_REALTY, myRealty} as const)
}

export type InitialRealtyStateType = typeof initialState
export type RealtyActionsType = InferActionsType<typeof realtyActions>
export type realtyType = {
  title: string
  deposit: number
  price: number
  payment: number
  photo: string
}