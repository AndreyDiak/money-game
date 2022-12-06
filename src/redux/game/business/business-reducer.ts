import { AppStateType, InferActionsType } from "../../store";
import { ThunkAction } from "redux-thunk";
import { actions } from "../game-reducer";
import { businesess } from "../../../img";

const SET_BUSINESSES = "businessPage/SET_BUSINESSES";
const SET_MY_BUSINESSES = "businessPage/SET_MY_BUSINESSES";
const ADD_TO_MY_BUSINESSES = "businessPage/ADD_TO_MY_BUSINESSES";
const REMOVE_FROM_MY_BUSINESSES = "businessPage/REMOVE_FROM_MY_BUSINESSES";
const UPDATE_BUSINESS_INCOME = "businessPage/UPDATE_BUSINESS_INCOME";
const RESET_MY_BUSINESSES = "businessPage/RESET_MY_BUSINESSES";
const OPEN_BUSINESS = "businessPage/OPEN_BUSINESS";

let initialState = {
  isAbleToShowNotification: false,
  myBusinesses: [] as BusinessType[],
  // список компаний для бизнесса . . .
  businesses: [
    {
      name: "АвтоСервис",
      price: 12000,
      income: 550,
      img: businesess.GARAGE,
    },
    {
      name: "Фуд-Корт",
      price: 10000,
      income: 500,
      img: businesess.FOOD_POINT,
    },
    {
      name: "Отель",
      price: 105000,
      income: 8200,
      img: businesess.HOTEL,
    },
    {
      name: "Ресторан",
      price: 20000,
      income: 1100,
      img: businesess.RESTARAUNT,
    },
    {
      name: "Торговый Центр",
      price: 85000,
      income: 6700,
      img: businesess.MALL,
    },
    {
      name: "Фабрика",
      price: 235000,
      income: 20000,
      img: businesess.FACTORY,
    },
    {
      name: "Ночной Клуб",
      price: 35000,
      income: 2800,
      img: businesess.CLUB,
    },
  ] as BusinessType[],
};

export const businessReducer = (
  state = initialState,
  action: BusinessActionType
): InitialBusinessStateType => {
  switch (action.type) {
    case OPEN_BUSINESS:
      return {
        ...state,
        isAbleToShowNotification: true,
      };
    // покупка бизнесса
    case ADD_TO_MY_BUSINESSES:
      return {
        ...state,
        myBusinesses: [...state.myBusinesses, action.business],
      };
    // продажа бизнесса
    case REMOVE_FROM_MY_BUSINESSES:
      let myBusinessCopy = [...state.myBusinesses];
      myBusinessCopy.forEach((myBusiness, index) => {
        if (myBusiness.name === action.business.name) {
          myBusinessCopy.splice(index, 1);
        }
      });
      return {
        ...state,
        myBusinesses: myBusinessCopy,
      };
    // обновление дохода с бизнесса
    case UPDATE_BUSINESS_INCOME:
      let myBusinessesCopy = [...state.myBusinesses];
      myBusinessesCopy.forEach((business, index) => {
        if (business.name === action.title) {
          myBusinessesCopy[index].income += action.income;
        }
      });
      return {
        ...state,
        myBusinesses: myBusinessesCopy,
      };
    // обнуление бизнесса
    case RESET_MY_BUSINESSES:
      return {
        ...state,
        myBusinesses: [] as BusinessType[],
      };
    case SET_MY_BUSINESSES:
      return {
        ...state,
        myBusinesses: action.myBusiness as BusinessType[],
      };
    default:
      return {
        ...state,
      };
  }
};

export const businessActions = {
  openBusiness: () => ({ type: OPEN_BUSINESS } as const),
  setBusinesses: () => ({ type: SET_BUSINESSES } as const),
  setMyBusinesses: (myBusiness: BusinessType[]) =>
    ({ type: SET_MY_BUSINESSES, myBusiness } as const),
  addToMyBusinesses: (business: BusinessType) =>
    ({ type: ADD_TO_MY_BUSINESSES, business } as const),
  removeFromMyBusiness: (business: BusinessType) =>
    ({ type: REMOVE_FROM_MY_BUSINESSES, business } as const),
  updateBusinessIncome: (title: string, income: number) =>
    ({ type: UPDATE_BUSINESS_INCOME, title, income } as const),
  resetMyBusinesses: () => ({ type: RESET_MY_BUSINESSES } as const),
};

type BusinessActionType = InferActionsType<typeof businessActions>;
export type BusinessType = {
  name: string;
  img: string;
  price: number;
  income: number;
};
export type InitialBusinessStateType = typeof initialState;
type BusinessThunkType = ThunkAction<
  any,
  AppStateType,
  unknown,
  BusinessActionType
>;

export const buyBusinessThunk =
  (business: BusinessType): BusinessThunkType =>
  (dispatch, getState) => {
    // добавляем бизнесс в портфель игрока . . .
    dispatch(businessActions.addToMyBusinesses(business));
    // @ts-ignore / обновляем доход игрока . . .
    dispatch(actions.buyBusiness(business.price, business.income));
  };

export const sellBusinessThunk =
  (business: BusinessType, price: number): BusinessThunkType =>
  (dispatch, getState) => {
    // удаляем бизнесс из портфеля . . .
    dispatch(businessActions.removeFromMyBusiness(business));
    // @ts-ignore / убираем доход и обновляем баланс
    dispatch(actions.sellBusiness(price, business.income));
  };
