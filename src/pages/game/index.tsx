import { notification, Spin } from "antd";
import React, { FC, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBusinessesSelector } from "../../redux/business-selector";
import { getDaySelector } from "../../redux/game/game-selector";
import { newsActions } from "../../redux/news-reducer";
import { getPersonSelector } from "../../redux/profile/profile-selector";
import { getTimeSpeedSelector } from "../../redux/settings-selector";
import { stocksActions } from "../../redux/market/stocks/stocks-reducer";
import { getStocksSelector } from "../../redux/market/stocks/stocks-selector";
import { AppStateType } from "../../redux/store";
import useActions from "../../utils/hooks/useActions";
import { GameRoutes } from "./_routes";

import classes from './index.module.css';
import { useStocks } from "../../hooks/market/useStocks";

const Navbar = React.lazy(() => import('../../components/Navbar'));
const Popups = React.lazy(() => import('../../components/Popups'));
const BottomNav = React.lazy(() => import('../../components/navigation/BottomNav'));

const GamePage: FC = React.memo(() => {

  const { setDay } = useActions()

  const dispatch = useDispatch()
  // переменная для скорости времени . . .
  const timeSpeed = useSelector(getTimeSpeedSelector)
  // роутер для запросов на сервер
  // const {request, isLoading, error} = useHttp()
  // токен авторизации . . .
  // const token = useSelector((state: AppStateType) => state.app.token)
  // счётчик дней . . .
  const day = useSelector(getDaySelector)
  // доход в месяц игрока . . .
  const income = useSelector((state: AppStateType) => state.profilePage.income)
  // статус игры
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  //
  const profile = useSelector(getPersonSelector)
  //
  const news = useSelector((state: AppStateType) => state.newsPage.news)
  // массив с акциями . . .
  const stocks = useSelector(getStocksSelector)

  // будущий массив с предложением по бизнессу . . .
  const businesses = useSelector(getBusinessesSelector)
  // количество новостей . . .
  const margin = useSelector((state: AppStateType) => state.stocksPage.margin)

  const [screenWidth] = useState(window.screen.width)
  // увеличиваем кол-во дней...
  const liveProcess = () => {
    if (timeSpeed !== 0 && gameStatus === 'process') {
      setTimeout(() => setDay(day + 1), timeSpeed * 500)
    }
  }
  // запуск функций
  liveProcess();
  // заполнение массива акциями . . .
  useStocks();
  //
  useEffect(() => {
    // создаём недвижимость...
    if (income >= 1000 && businesses.length === 0) {
      openNotification('Рынок недвижимости открыт!')
    }
    // создаем бизнесс...
    if (income >= 4500 && businesses.length === 0) {
      openNotification('Купите ваш первый настоящий бизнесс!')
    }
  }, [businesses.length, dispatch, income, margin, stocks.length])

  const openNotification = (text: string) => {
    notification.open({
      message: 'Поздравляем',
      description: text,
    });
  };

  if (!profile) {
    return (
      <>
        <div className={classes.loaderContainer}>
          <Spin size={'large'} /> <br />
          <NavLink to={'/'}>
            Выйдите в меню и перезгрузите страницу
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Popups />
      <div className={screenWidth > 768
        ? classes.mobileContainer
        : classes.desktopContainer}
      >
        {/* игровые роуты... */}
        <GameRoutes />
        {/* Нижняя навигация на телефонах */}
        <BottomNav />
      </div>
    </>
  )
})

export default GamePage;





