import businessImg1 from './../img/businesses/cafe.jpg'
import businessImg2 from './../img/businesses/garage.jpg'
import businessImg3 from './../img/businesses/service.jpg'
import businessImg4 from './../img/businesses/hotel.jpg'
import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {actions} from "./game-reducer";

const SET_BUSINESSES = 'businessPage/SET_BUSINESSES'
const ADD_TO_MY_BUSINESSES = 'businessPage/ADD_TO_MY_BUSINESSES'
const REMOVE_FROM_MY_BUSINESSES = 'businessPage/REMOVE_FROM_MY_BUSINESSES'

let initialState = {
  myBusinesses: [] as BusinessType[],
  // список компаний для бизнесса . . .
  businesses: [] as BusinessType[],
  companiesForBusiness: [
    {name: 'Ресторан', img: businessImg1},
    {name: 'Сдача гаража', img: businessImg2},
    {name: 'Сервис', img: businessImg3},
    {name: 'Мотель', img: businessImg4},
  ]
}



export const businessReducer = (state = initialState, action: BusinessActionType): InitialBusinessStateType => {
  switch (action.type) {
    // первое создание компаний для бизнесса
    case SET_BUSINESSES:
      let businessesCopy = [...state.businesses]
      state.companiesForBusiness.map(business => {
        let price = Number((Math.random() * 1000 + 500).toFixed(0))
        let income = Number((price / 10 + Number((Math.random() * 49 + 1).toFixed(1))).toFixed(1))

        let deal = {
          name: business.name,
          img: business.img,
          price: price,
          income: income
        }
        businessesCopy = [...businessesCopy, deal]
      })
      return {
        ...state,
        businesses: businessesCopy
      }
    case ADD_TO_MY_BUSINESSES:
      return {
        ...state,
        myBusinesses: [...state.myBusinesses, action.business]
      }
    case REMOVE_FROM_MY_BUSINESSES:
      let myBusinessCopy = [...state.myBusinesses]
      myBusinessCopy.map((myBusiness, index) => {
        if (myBusiness.name === action.business.name) {
          myBusinessCopy.splice(index, 1)
        }
      })
      return {
        ...state,
        myBusinesses: myBusinessCopy
      }
    default:
      return {
        ...state
      }
  }
}

export const businessActions = {
  setBusinesses: () => ({type: SET_BUSINESSES} as const),
  addToMyBusinesses: (business: BusinessType) => ({type: ADD_TO_MY_BUSINESSES, business} as const),
  removeFromMyBusiness: (business: BusinessType) => ({type: REMOVE_FROM_MY_BUSINESSES, business } as const)
}


type BusinessActionType = InferActionsType<typeof businessActions>
export type BusinessType = {
  name: string
  img: string
  price: number
  income: number
}
export type InitialBusinessStateType = typeof initialState
type BusinessThunkType = ThunkAction<any, AppStateType, unknown, BusinessActionType>

export const buyBusinessThunk = (business: BusinessType):BusinessThunkType => (dispatch, getState) => {
  // добавляем бизнесс в портфель игрока . . .
  dispatch(businessActions.addToMyBusinesses(business))
  // @ts-ignore / обновляем доход игрока . . .
  dispatch(actions.buyBusiness(business.price, business.income))
}

export const sellBusinessThunk = (business: BusinessType, price: number): BusinessThunkType => (dispatch, getState) => {
  // удаляем бизнесс из портфеля . . .
  dispatch(businessActions.removeFromMyBusiness(business))
  // @ts-ignore / убираем доход и обновляем баланс
  dispatch(actions.sellBusiness(price, business.income))
}