import { useSelector } from "react-redux";
import { BusinessType } from "../redux/business-reducer";
import { getMyBusinessesSelector } from "../redux/business-selector";
import { newsArrayType } from "../redux/news-reducer";
import { personType } from "../redux/profile-reducer";
import { myRealtyType } from "../redux/realty-reducer";
import { myStockType, stockType } from "../redux/stocks-reducer";
import { getMyStocksSelector, getStocksSelector } from "../redux/stocks-selector";
import { AppStateType } from "../redux/store";

export const CombineData = () => {

  const data = {
    myBusinesses: [] as BusinessType[],
    myRealty: [] as myRealtyType[],
    stocks: [] as stockType[],
    myStocks: [] as myStockType[],
    workedDays: 0,
    daysToUp: 0,
    workLevel: 0,
    workIncome: 0,
    news: [] as newsArrayType[],
    startSalary: 0,
    income: 0,
    childrenCount: 0,
    day: 0,
    level: 0,
    dayInMonth: 0,
    month: 0,
    wallet: 0,
    victoryBalance: 0,
    profile: null as null | personType
  }

  data.myBusinesses = useSelector(getMyBusinessesSelector)
  data.myRealty = useSelector((state: AppStateType) => state.realtyPage.myRealty)
  data.stocks = useSelector(getStocksSelector)
  data.myStocks = useSelector(getMyStocksSelector)
  data.workedDays = useSelector((state: AppStateType) => state.worksPage.workedDays)
  data.daysToUp = useSelector((state: AppStateType) => state.worksPage.daysToUp)
  data.workLevel = useSelector((state: AppStateType) => state.worksPage.workLevel)
  data.workIncome = useSelector((state: AppStateType) => state.worksPage.workIncome)
  data.news = useSelector((state: AppStateType) => state.newsPage.news)
  data.startSalary = useSelector((state: AppStateType) => state.profilePage.startSalary)
  data.income = useSelector((state: AppStateType) => state.profilePage.income)
  data.childrenCount = useSelector((state: AppStateType) => state.profilePage.childrenCount)
  data.day = useSelector((state: AppStateType) => state.gamePage.day)
  data.level = 0 // не реализовано . . .
  data.dayInMonth = useSelector((state: AppStateType) => state.gamePage.daysInMonth)
  data.month = useSelector((state: AppStateType) => state.gamePage.month)
  data.wallet = useSelector((state: AppStateType) => state.gamePage.wallet)
  data.victoryBalance = useSelector((state: AppStateType) => state.gamePage.victoryBalance)
  data.profile = useSelector((state: AppStateType) => state.profilePage.profile)

  return data
}