import {useDispatch, useSelector} from "react-redux";
import React, {FC, SetStateAction, useEffect} from "react";
import {getDaySelector} from "../../redux/game-selector";
import {CloseOutlined} from "@ant-design/icons";
import {getExpensesSelector, getPersonSelector, getTaxSelector} from "../../redux/profile-selector";
import {personType} from "../../redux/profile-reducer";

export const RenderPlayerWork: FC<{setIsChangeWorkShown: SetStateAction<any>}> = (props) => {

  const dispatch = useDispatch()

  // текущий день . . .
  const day = useSelector(getDaySelector)
  const profile = useSelector(getPersonSelector) as personType
  const expenses = useSelector(getExpensesSelector)
  const tax = useSelector(getTaxSelector)

  let expensesSummary = 0
  expenses.forEach(expense => {
    expensesSummary += expense.price * expense.payment / 100
  })

  useEffect(() => {
    console.log('мы поменялись')
    console.table(expenses)
  },[expenses])

  return (
    <>
      <div className="gameWork bannerBack">

        <div className="gameWorkContent">
          <div className="gameWorkContent__blocks gameWorkContent__expenses">
            <div className="gameWorkContent__blocksTitle">
              Затраты
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
                     <div className="gameWorkContent__block">
                        <div className="gameWorkContent__blockTitle">
                          {expense.title}
                        </div>
                        <div className="gameWorkContent__blockPrice">
                          ${profile.expenses[index].price !== 0
                          ? `${expense.price * expense.payment / 100} `
                          : '0'
                          }
                        </div>
                     </div>
                </>
              )
            })}
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
                $0
              </div>
            </div>
            <div className="gameWorkContent__block">
              <div className="gameWorkContent__blockTitle">
                Недвижимость
              </div>
              <div className="gameWorkContent__blockPrice">
                $0
              </div>
            </div>
            <div className="gameWorkContent__block">
              <div className="gameWorkContent__blockTitle">
                Бизнесс
              </div>
              <div className="gameWorkContent__blockPrice">
                $0
              </div>
            </div>
            <div className="gameWorkContent__block">
              <div className="gameWorkContent__blockTitle" style={{fontWeight: 400, textTransform: 'uppercase'}}>
                Доход
              </div>
              <div className="gameWorkContent__blockPrice">
                <b>${profile.salary - tax - expensesSummary}</b>
              </div>
            </div>
          </div>
          <div className="gameWorkContent__blocks gameWorkContent__liabilities">
            <div className="gameWorkContent__blocksTitle">
              Обязанности
            </div>
            {profile.expenses.map(expense => {
              return (
                <>
                  {expense.price
                   ? <div className="gameWorkContent__block">
                      <div className="gameWorkContent__blockTitle">
                        {expense.title}
                      </div>
                      <div className="gameWorkContent__blockPrice">
                        ${expense.price} <i>({expense.payment}%)</i>
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
                $0
              </div>
            </div>
            <div className="gameWorkContent__block">
              <div className="gameWorkContent__blockTitle">
                Вы проработали
              </div>
              <div className="gameWorkContent__blockPrice">
                0 дней
              </div>
            </div>
            <div className="gameWorkContent__block">
              <div className="gameWorkContent__blockTitle">
                До повышения
              </div>
              <div className="gameWorkContent__blockPrice">
                0 дней
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
