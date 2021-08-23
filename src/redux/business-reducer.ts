import businessImg1 from './../img/businesses/cafe.jpg'
import businessImg2 from './../img/businesses/garage.jpg'
import businessImg3 from './../img/businesses/service.jpg'
import businessImg4 from './../img/businesses/hotel.jpg'
import {InferActionsType} from "./store";

const SET_BUSINESSES = 'businessPage/SET_BUSINESSES'


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
    default:
      return {
        ...state
      }
  }
}

export const businessActions = {
  setBusinesses: () => ({type: SET_BUSINESSES} as const),
}


type BusinessActionType = InferActionsType<typeof businessActions>
export type BusinessType = {
  name: string
  img: string
  price: number
  income: number
}
export type InitialBusinessStateType = typeof initialState