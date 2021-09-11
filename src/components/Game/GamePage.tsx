import React, {FC, useEffect, useState} from "react";
import {notification, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux"
import {actions} from "../../redux/game-reducer";
import {getDaySelector, getLoseBalance, getVictoryBalance, getWalletSelector} from "../../redux/game-selector";
import {getTimeSpeedSelector} from "../../redux/settings-selector";
import {AppStateType} from "../../redux/store";
import {RenderPlayerWork} from "./RenderPlayerWork";
import {stocksActions, stockType} from "../../redux/stocks-reducer";
import {getMyStocksSelector, getStocksSelector} from "../../redux/stocks-selector";
import {newsActions} from "../../redux/news-reducer";
import {getBusinessesSelector, getMyBusinessesSelector} from "../../redux/business-selector";
import {businessActions} from "../../redux/business-reducer";
import {settingsActions} from "../../redux/settings-reducer";
import {Redirect, Route, Switch} from "react-router-dom";
import {getPersonSelector} from "../../redux/profile-selector";
import {Navbar} from "../Navbar";
import { SpendsPage } from "./SpendsPage";
import { NewsPage } from "./NewsPage";
import { BankPage } from "./BankPage";
import { MarketPage } from "./MarketPage";
import {NavLink} from "react-router-dom";
import {Popups} from "../Popups";

export const GamePage: FC = () => {

  const dispatch = useDispatch()
  // переменная для скорости времени . . .
  const timeSpeed = useSelector(getTimeSpeedSelector)

  // счётчик дней . . .
  const day = useSelector(getDaySelector)
  // кошелёк игрока . . .
  const wallet = useSelector(getWalletSelector)
  // доход в месяц игрока . . .
  const income = useSelector((state: AppStateType) => state.profilePage.income)
  // уровень трат . . .
  const spendsLevel = useSelector((state: AppStateType) => state.spendsPage.spendsLevel)
  const profile = useSelector(getPersonSelector)
  // баланс необходимый для победы . . .
  const victoryBalance = useSelector(getVictoryBalance)
  // баланс для поражения . . .
  const loseBalance = useSelector(getLoseBalance)

  // массив с акциями . . .
  const stocks = useSelector(getStocksSelector)
  // массив купленных акций . . .
  const myStocks = useSelector(getMyStocksSelector)
  // массив ваших бизнессов . . .
  const myBusinesses = useSelector(getMyBusinessesSelector)
  //
  const myRealty = useSelector((state: AppStateType) => state.realtyPage.myRealty)
  // будущий массив с предложением по бизнессу . . .
  const businesses = useSelector(getBusinessesSelector)
  // количество новостей . . .
  const news = useSelector((state: AppStateType) => state.newsPage.news)

  // активная акция . . .
  const [myActiveStock, setMyActiveStock] = useState(0)
  // переменная для просмотра истории цены акции . . .
  const [isHistoryShown, setIsHistoryShown] = useState(false)
  // переменная для продажи акций . . .
  const [isStockToSell, setIsStockToSell] = useState(false)
  // смена работы . . .
  const [isChangeWorkShown, setIsChangeWorkShown] = useState(false)
  // активная акция пользователя . . .
  const [activeStock, setActiveStock] = useState(null as null | stockType)
  // проверка на конец игры . . .
  const [isEndOfGame, setIsEndOfGame] = useState(false)
  // показать окно при конце игры
  const [showExitModal, setShowExitModal] = useState(false)
  // функция проверка на победу/поражение
  const balanceCheck = () => {
    if (income >= victoryBalance) {
      console.log('победа!')
      // зануление игры . . .
      if(!isEndOfGame) {
        setIsEndOfGame(true)
        setShowExitModal(true)
        dispatch(settingsActions.setTimeSpeed(0))
        dispatch(stocksActions.resetMyStocks())
        dispatch(businessActions.resetMyBusinesses())
        dispatch(newsActions.resetNews())
      }
    }
    if(wallet < loseBalance) {
      // зануление игры . . .
      if(!isEndOfGame) {
        setIsEndOfGame(true)
        setShowExitModal(true)
        dispatch(settingsActions.setTimeSpeed(0))
        dispatch(stocksActions.resetMyStocks())
        dispatch(businessActions.resetMyBusinesses())
        dispatch(newsActions.resetNews())
      }
    }
  }
  // функция которая ведёт подсчёт дней . . .
  const liveProcess = () => {
    if(timeSpeed !== 0) {
      setTimeout(() => {
        // диспатчим обновленный счетчик дней . . .
        dispatch(actions.setDay(day + 1))
      }, timeSpeed * 500)
    }
  }
  // запуск функций
  liveProcess()
  balanceCheck()

  // заполнение массива акциями . . .
  useEffect(() => {
    // создаём акции
    if (income >= 250 && stocks.length === 0) {
      // создаём акции
      dispatch(stocksActions.setStocks())
      // // // новости про акции
      dispatch(newsActions.setAbleToShow('stocksNews'))
      openNotification('Вам стала доступна покупка акций!')
      }
    // создаём бизнесс
    if (income >= 1000 && businesses.length === 0) {
      openNotification('Вам стала доступна покупка недвижимости')
    }
    if (income >= 4500 && businesses.length === 0) {
      openNotification('Вам стала доступна покупка своего бизнеса!')
    }
    },[income])

  const openNotification = (text: string) => {
    notification.open({
      message: 'Поздравляем',
      description: text,
    });
  }

  if (!profile) {
    return (
      <>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
          <Spin size={'large'}/> <br/>
          <NavLink to={'/'}>
            Выйдите в меню и перезгрузите страницу
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar isEndOfGame={isEndOfGame}/>
      <Popups
        myStock={myStocks[myActiveStock]}
        setIsStockToSell={setIsStockToSell}
        activeStock={myActiveStock}
        setIsHistoryShown={setIsHistoryShown}
        stock={activeStock as stockType}
        isHistoryShown={isHistoryShown}
        isStockToSell={isStockToSell}
        showExitModal={showExitModal}
      />
      <div style={{height: 'calc(100vh - 78px)'}}>
        <Switch>
          <Route path='/game/news' render={() =>
            <NewsPage
              setIsHistoryShown={setIsHistoryShown}
              setMyActiveStock={setMyActiveStock}
              setActiveStock={setActiveStock}
              setIsStockToSell={setIsStockToSell}
            />
          }/>
          <Route path='/game/spends' render={() =>
            <SpendsPage/>
          }/>
          <Route path='/game/profile' render={() =>
            <RenderPlayerWork />
          }/>
          <Route path='/game/market' render={() =>
            <MarketPage
              setIsHistoryShown={setIsHistoryShown}
              setMyActiveStock={setMyActiveStock}
              setActiveStock={setActiveStock}
              setIsStockToSell={setIsStockToSell}
            />}/>
          <Route path='/game/bank' render={() => <BankPage />}/>
          {/*<Redirect exact from='/game/market' to='/game/stocks />*/}
          <Redirect exact from='/game' to='/game/profile' />
        </Switch>
      </div>
    </>
  )
}


