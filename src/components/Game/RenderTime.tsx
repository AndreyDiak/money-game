import { Breadcrumb } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, balanceCheckThunk, updateMonthThunk } from "../../redux/game/game-reducer";
import { getDayInMonthSelector, getDaySelector, getMonthSelector, getMonthsSelector } from "../../redux/game/game-selector";
import { generateNewsThunk } from "../../redux/news/news-reducer";
import { weekSpendThunk } from "../../redux/spends-reducer";
import { payMarginPenaltyThunk, stocksActions } from "../../redux/market/stocks-reducer";
import { getStocksSelector } from "../../redux/market/stocks-selector";

type RenderTimeType = {
  wallet: number
}

export const RenderTime: FC<RenderTimeType> = (props) => {
  // день месяца . . .
  const dayInMonth = useSelector(getDayInMonthSelector)
  //
  const dispatch = useDispatch()
  // текущий день . . .
  const day = useSelector(getDaySelector)
  // акции
  const stocks = useSelector(getStocksSelector)
  // текущий месяц . . .
  const month = useSelector(getMonthSelector)
  // массив с месяцами . . .
  const months = useSelector(getMonthsSelector)
  // текущая работа . . .
  const [screenWidth] = useState(window.screen.width)
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
    dispatch(payMarginPenaltyThunk())
    dispatch(balanceCheckThunk())
    // TODO добавить сюда проверку баланса игрока на каждый день...
    // еженедельные покупки . . .
    if (day % 7 === 0 && day !== 0) {
      // создаем новости каждые две недели
      if(day % 14 === 0 && day !== 0) {
        dispatch(generateNewsThunk())
        // отправляем данные для сохранения игры . . .
      }
      // еженедельная трата . . .
      // dispatch(actions.weekSpend(difficulty))
      dispatch(weekSpendThunk())
      
      // обновление акций . . .
      if(stocks.length !== 0) {
        // обновление цен на акции . . .
        dispatch(stocksActions.indexingStocks())
        // обновление цен на облигации..
        dispatch(stocksActions.indexingBonds())
        // обновление цены всего портфеля игрока..
        dispatch(stocksActions.indexStocksSummaryPrice())
      }
      
    }
    // если сегодня последний день месяца, то обновляем месяц и выдаём зарплату игроку . . .
    if(dayInMonth === months[month].duration) {
      dispatch(actions.setMonth(month + 1))
      dispatch(updateMonthThunk())
      // doAllThings()
    }
  }, [day])

  // обновляем год после декабря . . .
  useEffect(() => {
    if (month === 11 && dayInMonth === 31) {
      dispatch(actions.setMonth(0))
      dispatch(updateMonthThunk())
      // doAllThings()
    }
  }, [month, dayInMonth])
  
  return (
    <>
        <Breadcrumb className='gameProfitHeader'>
          {screenWidth > 1024
          && <Breadcrumb.Item className='gameProfitHeader__Day'>
              {activeDay}
            </Breadcrumb.Item>}
          <Breadcrumb.Item className='gameProfitHeader__Month'>
            {dayInMonth}
            {screenWidth > 480
              ? ` ${activeMonth}`
              : `.${month < 9 ? '0' : ''}${month+1}`}
          </Breadcrumb.Item>
          {screenWidth > 1024
          && <Breadcrumb.Item className="gameProfitHeader__Day">
            <b>{day}</b> день
          </Breadcrumb.Item>}

        </Breadcrumb>
    </>
  )
}