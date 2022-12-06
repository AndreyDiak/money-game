import { Spin } from "antd";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDaySelector } from "../../redux/game/game-selector";
import { getPersonSelector } from "../../redux/profile/profile-selector";
import { getTimeSpeedSelector } from "../../redux/settings/settings-selector";
import { AppStateType } from "../../redux/store";
import useActions from "../../utils/hooks/useActions";
import { GameRoutes } from "./_routes";

import { useBusiness } from "../../hooks/market/useBusiness";
import { useRealty } from "../../hooks/market/useRealty";
import { useStocks } from "../../hooks/market/useStocks";
import classes from './index.module.css';

const Navbar = React.lazy(() => import('../../components/Navbar'));
const Popups = React.lazy(() => import('../../components/Popups'));
const BottomNav = React.lazy(() => import('../../components/navigation/BottomNav'));

const GamePage: FC = React.memo(() => {

  const { setDay } = useActions()

  const dispatch = useDispatch()
  // переменная для скорости времени . . .
  const timeSpeed = useSelector(getTimeSpeedSelector)
  // счётчик дней . . .
  const day = useSelector(getDaySelector)
  // статус игры
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  //
  const profile = useSelector(getPersonSelector)
  //
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
  useRealty();
  useBusiness();

  if (!profile) {
    return (
      <>
        <div className={classes.loaderContainer}>
          <div><Spin size={'large'} /> <br />
            <NavLink to={'/'}>
              Выйдите в меню и перезгрузите страницу
            </NavLink></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Popups />
      <div className={screenWidth > 768
        ? classes.desktopContainer
        : classes.mobileContanier}
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





