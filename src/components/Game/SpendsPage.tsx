import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getHappenedEventsSelector, getMonthSelector, getMonthsSelector} from "../../redux/game-selector";
import {Button, Tabs} from "antd";
import {eventType} from "../../redux/spends-reducer";
import {AppStateType} from "../../redux/store";
import { SpendsCard } from "./SpendsCard";
import {getExpensesSelector, getPersonSelector, getTaxSelector} from "../../redux/profile-selector";
import {expenseType, personType} from "../../redux/profile-reducer";

const { TabPane } = Tabs

export const SpendsPage: FC = (props) => {
  //
  const month = useSelector(getMonthSelector)
  //
  const months = useSelector(getMonthsSelector)
  //
  const currentMonthEvents = useSelector((state: AppStateType) => state.spendsPage.currentMonthEvents)
  //
  const currentMonthPrice = useSelector((state: AppStateType) => state.spendsPage.currentMonthPrice)
  //
  const tax = useSelector(getTaxSelector)
  //
  const newsExpenses = useSelector((state: AppStateType) => state.newsPage.newsExpenses)
  //
  const expenses = useSelector(getExpensesSelector) as expenseType[]
  //
  const profile = useSelector(getPersonSelector) as personType
  // расходы с новостей
  let newsExpensesPrice = 0
  if (newsExpenses.length !== 0) {
    newsExpenses.forEach(expenses => {
      newsExpensesPrice -= expenses.amount
    })
  }
  let expensesSummary = 0
  expenses.map(expense => {
    expensesSummary += expense.remainPrice
  })

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
                    ${newsExpensesPrice}
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
                      <SpendsCard key={index} title={event.title} price={event.price} index={index}/>
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
}