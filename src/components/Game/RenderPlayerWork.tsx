import {useDispatch, useSelector} from "react-redux";
import React, {FC, SetStateAction, useEffect} from "react";
import {getDaySelector} from "../../redux/game-selector";
import {getExpensesSelector, getPersonSelector, getTaxSelector} from "../../redux/profile-selector";
import {expenseType, personType, updateIncome} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/store";
import {upWorkThunk, worksActions} from "../../redux/work-reducer";
import {getMyStocksSelector} from "../../redux/stocks-selector";
import {getMyBusinessesSelector} from "../../redux/business-selector";

export const RenderPlayerWork: FC<{setIsChangeWorkShown: SetStateAction<any>}> = (props) => {

  const dispatch = useDispatch()

  // текущий день . . .
  const day = useSelector(getDaySelector)
  const profile = useSelector(getPersonSelector) as personType
  const expenses = useSelector(getExpensesSelector) as expenseType[]
  const tax = useSelector(getTaxSelector)
  const income = useSelector((state: AppStateType) => state.profilePage.income)
  const myStocks = useSelector(getMyStocksSelector)
  const myRealty = useSelector((state: AppStateType) => state.realtyPage.myRealty)
  const myBusiness = useSelector(getMyBusinessesSelector)
  const newsIncome = useSelector((state: AppStateType) => state.newsPage.newsIncome)
  const newsExpenses = useSelector((state: AppStateType) => state.newsPage.newsExpenses)
  // работа персонажа
  const daysWorked = useSelector((state: AppStateType) => state.worksPage.workedDays)
  const daysToUp = useSelector((state: AppStateType) => state.worksPage.daysToUp)
  const workIncome = useSelector((state: AppStateType) => state.worksPage.workIncome)
  const workLevel = useSelector((state: AppStateType) => state.worksPage.workLevel)

  useEffect(() => {
    console.log('мы поменялись')
    console.table(expenses)
  },[expenses])

  useEffect(() => {

    if (daysToUp === 0 && workLevel < 3) {
      dispatch(upWorkThunk())
      dispatch(updateIncome())
      return
    }

    dispatch(worksActions.setWorkedDays())
  }, [day])


  // пассивный доход с дивидендов
  let dividendsSummary = 0
  myStocks.forEach(stock => {
    dividendsSummary += stock.dividendsAmount * stock.count
  })
  // пассивный доход с недвижимости
  let realtySummary = 0
  myRealty.forEach(realty => {
    realtySummary += realty.payment
  })
  // пассивный доход с бизнеса
  let businessSummary = 0
  myBusiness.forEach(business => {
    businessSummary += business.income
  })
  // расходы с новостей
  let newsExpensesPrice = 0
  if (newsExpenses.length !== 0) {
    newsExpenses.forEach(expenses => {
      newsExpensesPrice -= expenses.amount
    })
  }
  // доходы с новостей
  let newsIncomesPrice = 0
  if (newsIncome.length !== 0) {
    newsIncome.forEach(income => {
      newsIncomesPrice += income.amount
    })
  }
  return (
    <>
      <div className="gameWork bannerBack">
          <div className="gameWorkContent">
            <div className="container">
            <div className="gameWorkContent__blocks gameWorkContent__expenses">
              <div className="gameWorkContent__blocksTitle">
                Расходы
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Налог
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${tax}
                </div>
              </div>
              {expenses.map((expense, index) => {
                return (
                  <>
                    {expense.remainPrice !== 0
                      ? <div className="gameWorkContent__block">
                        <div className="gameWorkContent__blockTitle">
                          {expense.title}
                        </div>
                        <div className="gameWorkContent__blockPrice">
                          ${expense.startPrice * expense.payment / 100}
                        </div>
                      </div>
                      : ''
                    }
                  </>
                )
              })}
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Другое
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${newsExpensesPrice}
                </div>
              </div>
            </div>
            <div className="gameWorkContent__blocks gameWorkContent__incomes">
              <div className="gameWorkContent__blocksTitle">
                Доходы
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Зарплата
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${profile.salary}
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Акции
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${dividendsSummary.toFixed(1)}
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Недвижимость
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${realtySummary}
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Бизнес
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${businessSummary}
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Другое
                </div>
                <div className="gameWorkContent__blockPrice">
                  ${newsIncomesPrice}
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle" style={{fontWeight: 400, textTransform: 'uppercase'}}>
                  Доход
                </div>
                <div className="gameWorkContent__blockPrice">
                  <b>${income}</b>
                </div>
              </div>
            </div>
            <div className="gameWorkContent__blocks gameWorkContent__liabilities">
              <div className="gameWorkContent__blocksTitle">
                Обязательства
              </div>
              {profile.expenses.map(expense => {
                return (
                  <>
                    {expense.remainPrice
                      ? <div className="gameWorkContent__block">
                        <div className="gameWorkContent__blockTitle">
                          {expense.title}
                        </div>
                        <div className="gameWorkContent__blockPrice">
                          ${expense.remainPrice} <i>({expense.payment}%)</i>
                        </div>
                      </div>
                      : ''}
                  </>
                )
              })}
            </div>
            <div className="gameWorkContent__blocks gameWorkContent__work">
              <div className="gameWorkContent__blocksTitle">
                Работа
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Ваша работа
                </div>
                <div className="gameWorkContent__blockPrice">
                  {profile.work}
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Прибавка к зарплате
                </div>
                <div className="gameWorkContent__blockPrice">
                  {workIncome}%
                </div>
              </div>
              <div className="gameWorkContent__block">
                <div className="gameWorkContent__blockTitle">
                  Вы проработали
                </div>
                <div className="gameWorkContent__blockPrice">
                  {daysWorked} дней
                </div>
              </div>
              {workLevel < 3
                ? <div className="gameWorkContent__block">
                  <div className="gameWorkContent__blockTitle">
                    До повышения
                  </div>
                  <div className="gameWorkContent__blockPrice">
                    {daysToUp} дней
                  </div>
                </div>
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
