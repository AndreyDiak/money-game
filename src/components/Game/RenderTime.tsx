import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getDayInMonthSelector, getDaySelector, getMonthSelector, getMonthsSelector} from "../../redux/game-selector";
import {actions} from "../../redux/game-reducer";
import {AppStateType} from "../../redux/store";
import {Work} from "../../redux/work-reducer";
import {stocksActions} from "../../redux/stocks-reducer";
import { getStocksSelector } from "../../redux/stocks-selector";
import {getDifficultySelector} from "../../redux/settings-selector";
import {setNewsThunk} from "../../redux/news-reducer";
import {getMyBusinessesSelector} from "../../redux/business-selector";
import {getRandomNumber} from "../../utils/getRandomNumber";
import {spendsActions, weekSpendThunk} from "../../redux/spends-reducer";
import {personType, profileActions, updateIncome} from "../../redux/profile-reducer";
import {getExpensesSelector, getPersonSelector, getTaxSelector} from "../../redux/profile-selector";
import {realtyActions} from "../../redux/realty-reducer";

type RenderTimeType = {
  wallet: number
}

export const RenderTime: FC<RenderTimeType> = (props) => {

  const newsTypeArray = useSelector((state: AppStateType) => state.newsPage.newsTypes)

  const companies = useSelector((state: AppStateType) => state.stocksPage.companiesForStocks)
  // день месяца . . .
  const dayInMonth = useSelector(getDayInMonthSelector)
  const difficulty = useSelector(getDifficultySelector)

  const dispatch = useDispatch()
  // текущий день . . .
  const day = useSelector(getDaySelector)
  // акции
  const stocks = useSelector(getStocksSelector)
  // текущий месяц . . .
  const month = useSelector(getMonthSelector)
  // массив с месяцами . . .
  const months = useSelector(getMonthsSelector)
  // массив ваших бизнессов . . .
  const myBusinesses = useSelector(getMyBusinessesSelector)
  // текущая работа . . .
  // const profile = useSelector(getPersonSelector) as personType
  //
  const income = useSelector((state: AppStateType) => state.profilePage.income)
  // const expenses = useSelector(getExpensesSelector)
  // подоходный налог на зп
  // const tax = useSelector(getTaxSelector)
  // массив с днями . . .
  const Days = [
    'Воскресенье', 'Понедельник', 'Вторник',
    'Среда', 'Четверг',
    'Пятница', 'Суббота'
  ]
  // находим день недели . . .
  const activeDay = Days[day % 7]
  // месяц . . .
  const activeMonth = month === 2 || month === 7
    ? months[month].name + 'a'
    : months[month].name.replace('ь','я')

  // обновляем счётчик недель . . .
  useEffect(() => {
    dispatch(actions.setDayInMonth(dayInMonth + 1))
    // еженедельные покупки . . .
    if (day % 7 === 0 && day !== 0) {
      const generateNews = (): any => {
        // stocksNews / businessNews / personNews . . .
        let newsType = getRandomNumber(3)
        if (newsTypeArray[newsType].ableToShow) {
          let company = ''
          if(newsTypeArray[newsType].type === 'stocksNews') {
            company = companies[getRandomNumber(companies.length)]
          }
          if (newsTypeArray[newsType].type === 'businessNews') {
            if (myBusinesses.length !== 0) {
              let companyIndex = getRandomNumber(myBusinesses.length)
              company = myBusinesses[companyIndex].name
            } else {
              return generateNews()
            }
          }
          dispatch(setNewsThunk(newsTypeArray[newsType].type, company))
        } else {
          generateNews()
        }
      }
      // создаем новости каждые две недели
      if (day % 14 === 0 && day !== 0) {
          generateNews()
      }
      // еженедельная трата . . .
      // dispatch(actions.weekSpend(difficulty))
      dispatch(weekSpendThunk(difficulty))

      // обновление акций . . .
      if(stocks.length !== 0) {
        // обновление цен на акции . . .
        dispatch(stocksActions.indexingStocks())
      }
    }

    // если сегодня последний день месяца, то обновляем месяц и выдаём зарплату игроку . . .
    if(dayInMonth === months[month].duration) {
      dispatch(actions.setMonth(month + 1))
      doAllThings()
    }
  }, [day])

  // обновляем год после декабря . . .
  useEffect(() => {
    if (month === 11 && dayInMonth === 31) {
      dispatch(actions.setMonth(0))
      doAllThings()
    }
  }, [month, dayInMonth])

  // делает всё необходимое при наступлении нового месяца
  const doAllThings = () => {
    // ставим первый день в месяце
    dispatch(actions.setDayInMonth(1))
    // зануляем траты прошлого месяца
    dispatch(spendsActions.resetCurrentMonth())
    // чистая прибыль персонажа в месяц
    dispatch(actions.updateWallet(income))
    // создаем предложение по недвижимости
    dispatch(realtyActions.generateActiveRealty())
    // уменьшаем необходимую выплату по долгу на месячную ставку
    dispatch(profileActions.updateExpenses())
    // если мы выплатили целиком какой либо долг, то у нас растет ЗП
    dispatch(updateIncome())
  }

  return (
    <>
        <Breadcrumb className='gameProfitHeader'>
          <Breadcrumb.Item className='gameProfitHeader__Day'>
            {activeDay}
          </Breadcrumb.Item>
          <Breadcrumb.Item className='gameProfitHeader__Month'>
            {dayInMonth} {activeMonth}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="gameProfitHeader__Day">
            <b>{day}</b> день
          </Breadcrumb.Item>
        </Breadcrumb>
    </>
  )
}