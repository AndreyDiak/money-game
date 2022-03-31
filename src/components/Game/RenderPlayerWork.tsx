import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import childrenFalse from "../../img/children-none.png";
import childrenTrue from "../../img/children.png";
import { getMyBusinessesSelector } from "../../redux/business-selector";
import { getDaySelector } from "../../redux/game-selector";
import { personType, updateIncome } from "../../redux/profile-reducer";
import { getPersonSelector } from "../../redux/profile-selector";
import { myStockType } from "../../redux/stocks-reducer";
import { getMyStocksSelector } from "../../redux/stocks-selector";
import { AppStateType } from "../../redux/store";
import { upWorkThunk, worksActions } from "../../redux/work-reducer";

const RenderPlayerWork = () => {

  const dispatch = useDispatch()

  // текущий день . . .
  const day = useSelector(getDaySelector)
  //
  const profile = useSelector(getPersonSelector) as personType
  //
  const income = useSelector((state: AppStateType) => state.profilePage.income)
  //
  const myStocks: myStockType[] = useSelector(getMyStocksSelector)
  //
  const myRealty = useSelector((state: AppStateType) => state.realtyPage.myRealty)
  //
  const myBusiness = useSelector(getMyBusinessesSelector)
  //
  const newsIncome = useSelector((state: AppStateType) => state.newsPage.newsIncome)
  //
  const childrenCount = useSelector((state: AppStateType) => state.profilePage.childrenCount)
  // работа персонажа
  const daysWorked = useSelector((state: AppStateType) => state.worksPage.workedDays)
  //
  const daysToUp = useSelector((state: AppStateType) => state.worksPage.daysToUp)
  //
  const workIncome = useSelector((state: AppStateType) => state.worksPage.workIncome)
  //
  const workLevel = useSelector((state: AppStateType) => state.worksPage.workLevel)

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
    realtySummary += realty.income - realty.payment
  })
  // пассивный доход с бизнеса
  let businessSummary = 0
  myBusiness.forEach(business => {
    businessSummary += business.income
  })
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
              <div className="gameWorkContent__profile">
                <div className='gameWorkContent__profileImg'>
                  <img src={profile.img} alt=""/> <br/>
                </div>
                <h3><b>Количество детей</b></h3>
                <div className="gameWorkContent__profileChild">
                  {Array(3).fill(1).map((c, index) => {
                    return (
                      <>
                        <div>
                          <img src={childrenCount - 1 >= index ? childrenTrue : childrenFalse} alt=""/>
                        </div>
                      </>
                    )
                  })}
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

export default RenderPlayerWork