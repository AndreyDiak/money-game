import React, {FC, useEffect, useState} from "react";
import {RenderPlayerSpends} from "./RenderPlayerSpends";
import {RenderChart} from "./RenderChart";
import {RenderPlayerProfile} from "./RenderPlayerProfile";
import {Badge, Button, Modal, notification, Spin, Tabs} from "antd";
import {SellPopup} from "./SellPopup";
import {useDispatch, useSelector} from "react-redux"
import {actions} from "../../redux/game-reducer";
import {getDaySelector, getLoseBalance, getVictoryBalance, getWalletSelector} from "../../redux/game-selector";
import {getTimeSpeedSelector} from "../../redux/settings-selector";
import {AppStateType} from "../../redux/store";
import {RenderPlayerWork} from "./RenderPlayerWork";
import {RenderPlayerStocks} from "./RenderPlayerStocks";
import {RenderPlayerNews} from "./RenderPlayerNews";
import {stocksActions, stockType} from "../../redux/stocks-reducer";
import {getMyStocksSelector, getStocksSelector} from "../../redux/stocks-selector";
import {newsActions} from "../../redux/news-reducer";
import {getBusinessesSelector, getMyBusinessesSelector} from "../../redux/business-selector";
import {businessActions} from "../../redux/business-reducer";
import {settingsActions} from "../../redux/settings-reducer";
import {NavLink} from "react-router-dom";
import {getPersonSelector} from "../../redux/profile-selector";
import {RenderPlayerBank} from "./RenderPlayerBank";
import {RenderPlayerMarket} from "./RenderPlayerMarket";

const { TabPane } = Tabs

export const GamePage: FC = () => {

  const dispatch = useDispatch()
  // переменная для скорости времени . . .
  const timeSpeed = useSelector(getTimeSpeedSelector)

  // счётчик дней . . .
  const day = useSelector(getDaySelector)
  // кошелёк игрока . . .
  const wallet = useSelector(getWalletSelector)
  // доход в месяц игрока . . .
  // const income = useSelector(getIncomeSelector)
  // стартовый доход . . .
  // const startIncome = useSelector((state: AppStateType) => state.worksPage.currentWork?.startSalary) as number
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
    if (wallet >= victoryBalance) {
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

  // useEffect(() => {
  //   dispatch(actions.setIncome(startIncome))
  // },[])

  // заполнение массива акциями . . .
  useEffect(() => {
    // создаём акции
    if (wallet >= 500 && stocks.length === 0) {
      // создаём акции
      dispatch(stocksActions.setStocks())
      // // // новости про акции
      dispatch(newsActions.setAbleToShow('stocksNews'))
      openNotification('Вам стали доступны акции!')
      }
    // создаём бизнесс
    if (wallet >= 3000 && businesses.length === 0) {
      // создаем бизнесс
      dispatch(businessActions.setBusinesses())
      // новости про бизнесс
      dispatch(newsActions.setAbleToShow('businessNews'))
      openNotification('Вам стал доступен бизнесс')
      }
    },[wallet])

  const openNotification = (text: string) => {
    notification.open({
      message: 'Поздравляем',
      description: text,
    });
  }

  return (
    <>
      {profile
        ?
          <div>
            <Modal title="Конец?" onCancel={() => setShowExitModal(false)}  visible={showExitModal} footer={[
              <>
                <NavLink to='/'>
                  <Button type='primary' onClick={() => dispatch(actions.initGame())}>
                    Выйти в меню
                  </Button>
                </NavLink>
              </>
            ]}>
              <p>Это окно появляется при окончании игры!</p>
            </Modal>
            {isStockToSell ? <SellPopup stock={myStocks[myActiveStock]} setIsStockToSell={setIsStockToSell} activeStock={myActiveStock}/> : ''}
            {isHistoryShown ? <RenderChart setIsHistoryShown={setIsHistoryShown} stock={activeStock as stockType} /> : ''}
            <div className="game">
              <div className='gameProfile'>
                <RenderPlayerProfile wallet={wallet} isEndOfGame={isEndOfGame}/>
              </div>
              <div className="gameActions">
                <Tabs defaultActiveKey="2">
                  <TabPane tab={
                    <Badge count={news.length} overflowCount={10}>Новости</Badge>
                  } key="1">
                    <RenderPlayerNews
                      setIsHistoryShown={setIsHistoryShown}
                      setMyActiveStock={setMyActiveStock}
                      setActiveStock={setActiveStock}
                      setIsStockToSell={setIsStockToSell}
                    />
                  </TabPane>
                  <TabPane tab="Профиль" key="2" active>
                    <RenderPlayerWork setIsChangeWorkShown={setIsChangeWorkShown}/>
                  </TabPane>
                  <TabPane tab="Покупки" key="3">
                    <RenderPlayerSpends/>
                  </TabPane>
                  {/*wallet <= 500 && myStocks.length === 0 || isEndOfGame*/}
                  <TabPane tab="Рынок" key="4" disabled={false} >
                    <RenderPlayerMarket
                      setIsHistoryShown={setIsHistoryShown}
                      setMyActiveStock={setMyActiveStock}
                      setActiveStock={setActiveStock}
                      setIsStockToSell={setIsStockToSell}
                    />
                  </TabPane >
                  {/*wallet <= 3000 && myBusinesses.length === 0 || isEndOfGame*/}
                  <TabPane tab="Банк" key="5" disabled={false}>
                    <RenderPlayerBank />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        : <Spin style={{position: 'absolute', top: 'calc(50% - 13px)', left: 'calc(50% - 10px)'}}/>
      }
    </>
  )
}


