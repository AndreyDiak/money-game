import { Badge, notification, Spin } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useRoutes } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import menuIconBank from "../../img/menu/bank.svg";
import menuIconMarket from "../../img/menu/market.svg";
import menuIconNews from "../../img/menu/news.svg";
import menuIconProfile from "../../img/menu/profile.svg";
import menuIconSpends from "../../img/menu/spends.svg";
import { getBusinessesSelector } from "../../redux/business-selector";
import { actions } from "../../redux/game-reducer";
import { getDaySelector } from "../../redux/game-selector";
import { newsActions } from "../../redux/news-reducer";
import { getPersonSelector } from "../../redux/profile-selector";
import { getTimeSpeedSelector } from "../../redux/settings-selector";
import { brokerType, stocksActions, stockType } from "../../redux/stocks-reducer";
import { getMyStocksSelector, getStocksSelector } from "../../redux/stocks-selector";
import { AppStateType } from "../../redux/store";
import { Navbar } from "../Navbar";
import { Popups } from "../Popups";
import { BankPage } from "./BankPage";
import { MarketPage } from "./Market/MarketPage";
import { NewsPage } from "./NewsPage";
import { RenderPlayerWork } from "./RenderPlayerWork";
import { SpendsPage } from "./Spends/SpendsPage";


export const GamePage: FC = React.memo(() => {

  const dispatch = useDispatch()
  // переменная для скорости времени . . .
  const timeSpeed = useSelector(getTimeSpeedSelector)
  // роутер для запросов на сервер
  const {request, isLoading, error} = useHttp()
  // токен авторизации . . .
  const token = useSelector((state: AppStateType) => state.app.token)
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
  // массив купленных акций . . .
  const myStocks = useSelector(getMyStocksSelector)
  // будущий массив с предложением по бизнессу . . .
  const businesses = useSelector(getBusinessesSelector)
  // количество новостей . . .
  const margin = useSelector((state: AppStateType) => state.stocksPage.margin)
  // активная акция . . .
  const [myActiveStock, setMyActiveStock] = useState(0)
  // активная акция пользователя . . .
  const [activeStock, setActiveStock] = useState(null as null | stockType)
  //
  const [activeBroker, setActiveBroker] = useState({} as brokerType)
  // переменная для продажи акций . . .
  const [isStockToSell, setIsStockToSell] = useState(false)
  //
  const [isStockToBuy, setIsStockToBuy] = useState(false)
  //
  const [isMarginShown, setIsMarginShown] = useState(false)
  // переменная для просмотра истории цены акции . . .
  const [isHistoryShown, setIsHistoryShown] = useState(false)
  //
  const [isMarginPayBackShown, setIsMarginPayBackShown] = useState(false)
  //
  const [isMarketOpen, setIsMarketOpen] = useState(false)
  //
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  // увеличиваем кол-во дней...
  const liveProcess = () => {
    if(timeSpeed !== 0 && gameStatus === 'process') {
      setTimeout(() => dispatch(actions.setDay(day + 1)), timeSpeed * 500)
    }
  }
  // запуск функций
  liveProcess()
  // заполнение массива акциями . . .
  useEffect(() => {
    // создаём акции
    if (income >= 250 && stocks.length === 0) {
      // создаём акции
      dispatch(stocksActions.setStocks())
      dispatch(stocksActions.setBrokers())
      dispatch(stocksActions.setBonds())
      // новости про акции
      dispatch(newsActions.setAbleToShow('stocksNews'))
      openNotification('Рынок акций / облигаций открыт!')
      }
    // создаём бизнесс
    if (income >= 1000 && businesses.length === 0) {
      openNotification('Рынок недвижимости открыт!')
    }
    if (income >= 4500 && businesses.length === 0) {
      openNotification('Купите ваш первый настоящий бизнесс!')
    }
    },[income, margin])

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
      <Navbar />
      <Popups
        myStock={myStocks[myActiveStock]}
        setIsStockToSell={setIsStockToSell}
        activeStock={myActiveStock}
        setIsHistoryShown={setIsHistoryShown}
        stock={activeStock as stockType}
        isHistoryShown={isHistoryShown}
        isStockToSell={isStockToSell}
        isStockToBuy={isStockToBuy}
        setIsStockToBuy={setIsStockToBuy}
        setIsMarketOpen={setIsMarketOpen}
        isMarketOpen={isMarketOpen}
        activeBroker={activeBroker}
        isMarginShown={isMarginShown}
        isMarginPayBackShown={isMarginPayBackShown}
        setIsMarginShown={setIsMarginShown}
        setActiveStock={setActiveStock}
        setIsMarginPayBackShown={setIsMarginPayBackShown}
      />
      <div style={screenWidth > 768
        ? {height: 'calc(100vh - 78px)', overflow: 'hidden'}
        : {height: 'calc(100vh - 50px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden'}}
      >
        {/* игровые роуты... */}
        <Pages 
          setActiveBroker={setActiveBroker} 
          setActiveStock={setActiveStock} 
          setIsHistoryShown={setIsHistoryShown} 
          setIsMarginPayBackShown={setIsMarginPayBackShown} 
          setIsMarginShown={setIsMarginShown} 
          setIsStockToSell={setIsStockToSell}
          setIsStockToBuy={setIsStockToBuy}
          setMyActiveStock={setMyActiveStock}
        />
        <div className="bottomNav">
          <div className="bottomNavItem">
            <NavLink to='/game/spends'>
              <button className="">
                <img src={menuIconSpends} alt=""/>
              </button>
            </NavLink>
          </div>
          <div className="bottomNavItem">
            <NavLink to='/game/market'>
              <button className="">
                <img src={menuIconMarket} alt=""/>
              </button>
            </NavLink>
          </div>
          <div className="bottomNavItem">
            <NavLink to='/game/profile'>
              <button className="">
                <img src={menuIconProfile} alt=""/>
              </button>
            </NavLink>
          </div>
          <div className="bottomNavItem">
            <NavLink to='/game/bank'>
              <button className="">
                <img src={menuIconBank} alt=""/>
              </button>
            </NavLink>
          </div>
          <div className="bottomNavItem">
            <Badge count={news.length} size={"small"} overflowCount={10}>
              <NavLink to='/game/news'>
                <button className="">
                  <img src={menuIconNews} alt=""/>
                </button>
              </NavLink>
            </Badge>
          </div>
        </div>
      </div>
    </>
  )
})
type PagesType = {
  setIsStockToSell: (isShown: boolean) => void 
  setIsHistoryShown: (isShown: boolean) => void
  setIsStockToBuy: (isShown: boolean) => void
  setMyActiveStock: (index: number) => void
  setActiveStock: (stock: stockType) => void
  setIsMarginPayBackShown: (isMarginPayBackShown: boolean) => void
  setActiveBroker: (activeBroker: brokerType) => void
  setIsMarginShown: (isMarginShown: boolean) => void
}
const Pages: FC<PagesType> = React.memo(({
  setIsHistoryShown, setMyActiveStock, setActiveStock, setIsStockToBuy,
  setIsStockToSell,setActiveBroker,setIsMarginShown,setIsMarginPayBackShown
}) => {
  const routes = useRoutes([
    {
      path: '',
      index: true,
      element: <RenderPlayerWork />
    },
    {
      path: 'spends',
      element: <SpendsPage/> ,
    },
    {
      path: 'profile',
      element: <RenderPlayerWork />
    },
    {
      path: 'bank',
      element: <BankPage />
    },
    {
      path: 'news',
      element: 
        <NewsPage 
          setIsHistoryShown={setIsStockToBuy}
          setMyActiveStock={setMyActiveStock}
          setActiveStock={setActiveStock}
          setIsStockToSell={setIsStockToSell} 
        />
    },
    {
      path: 'market',
      element:
        <MarketPage
          setIsHistoryShown={setIsHistoryShown}
          setMyActiveStock={setMyActiveStock}
          setActiveStock={setActiveStock}
          setIsStockToSell={setIsStockToSell}
          setIsStockToBuy={setIsStockToBuy}
          setActiveBroker={setActiveBroker}
          setIsMarginShown={setIsMarginShown} 
          setIsMarginPayBackShown={setIsMarginPayBackShown}  
        />
    }
  ])

  return routes
})




