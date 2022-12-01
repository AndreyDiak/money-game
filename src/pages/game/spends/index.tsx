import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getMonthSelector, getMonthsSelector } from "../../../redux/game/game-selector";
import { expenseType, personType } from "../../../redux/profile/profile-reducer";
import { getExpensesSelector, getPersonSelector, getTaxSelector } from "../../../redux/profile/profile-selector";
import { eventType } from "../../../redux/spends-reducer";
import { AppStateType } from "../../../redux/store";
import { SpendsCard } from "../../../components/game/spends/SpendsCard";

const SpendsPage: FC = React.memo(() => {
  //
  const month = useSelector(getMonthSelector);
  //
  const months = useSelector(getMonthsSelector);
  //
  const currentMonthEvents = useSelector((state: AppStateType) => state.spendsPage.currentMonthEvents);
  //
  const currentMonthPrice = useSelector((state: AppStateType) => state.spendsPage.currentMonthPrice);
  //
  const tax = useSelector(getTaxSelector)
  //
  const childrenCount = useSelector((state: AppStateType) => state.profilePage.childrenCount);
  //
  const expenses = useSelector(getExpensesSelector) as expenseType[]
  //
  const profile = useSelector(getPersonSelector) as personType
  // расходы с новостей
  let expensesSummary = expenses.reduce((acc, next) => acc + next.remainPrice, 0)

  return (
    <>
      <div className='gameSpend bannerBack'>
        <div className="gameSpendContent">
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
                  ${childrenCount * 125}
                </div>
              </div>
            </div>
            {expensesSummary > 0 && <div className="gameWorkContent__blocks gameWorkContent__liabilities">
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
            </div>}
            <div className="gameWorkContent__blocks">
              <div className="gameSpendContent__Title">
                <b>Месячные траты / {months[month].name}</b>
              </div>
              <div className="gameSpendContent__Items">
                {currentMonthEvents.map((event: eventType, index: number) => {
                  return (
                    <>
                      <SpendsCard key={index} title={event.title} price={event.price} index={index} />
                    </>
                  )
                })}
              </div>
              <div className="gameSpendContent__Footer">
                <div className="gameSpendContent__FooterTitle">
                  Общая сумма:
                </div>
                <span className="gameSpendContent__FooterPrice">
                  <b>${currentMonthPrice}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default SpendsPage