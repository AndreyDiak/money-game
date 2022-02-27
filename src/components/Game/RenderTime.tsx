import { Breadcrumb } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { actions, generateNewsThunk, updateMonthThunk } from "../../redux/game-reducer";
import { getDayInMonthSelector, getDaySelector, getMonthSelector, getMonthsSelector } from "../../redux/game-selector";
import { weekSpendThunk } from "../../redux/spends-reducer";
import { marginPayOutThunk, stocksActions } from "../../redux/stocks-reducer";
import { getStocksSelector } from "../../redux/stocks-selector";
import { AppStateType } from "../../redux/store";

type RenderTimeType = {
  wallet: number
}

export const RenderTime: FC<RenderTimeType> = (props) => {

  // день месяца . . .
  const dayInMonth = useSelector(getDayInMonthSelector)
  //
  // const {request, isLoading, error} = useHttp()
  //
  // const token = useSelector((state: AppStateType) => state.app.token)
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
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
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
    dispatch(marginPayOutThunk())
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
        // обновление цены всего портфеля игрока...
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