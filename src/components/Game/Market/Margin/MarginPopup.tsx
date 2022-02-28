import { CloseOutlined } from "@ant-design/icons"
import { Button, InputNumber, Slider } from "antd"
import React, { FC, useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { actions } from "../../../../redux/game-reducer"
import { getWalletSelector } from "../../../../redux/game-selector"
import { settingsActions } from "../../../../redux/settings-reducer"
import { getConstTimeSpeedSelector } from "../../../../redux/settings-selector"
import { addMarginToPortfolioThunk, addStocksToPortfolioThunk, brokerType, stocksActions, stockType, updateBrokerStocksCountThunk } from "../../../../redux/stocks-reducer"
import { getStocksSelector } from "../../../../redux/stocks-selector"
import { AppStateType } from "../../../../redux/store"

type MarginPopupType = {
  broker: brokerType
  setIsMarginShown: (isMarginShown: boolean) => void
}
export const MarginPopup: FC<MarginPopupType> = ({broker, setIsMarginShown}) => {

  const dispatch = useDispatch()
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  const stocksSummaryPrice = useSelector((state: AppStateType) => state.stocksPage.stocksSummaryPrice)
  const isInstructionCompleted = useSelector((state: AppStateType) => state.stocksPage.isInstructionCompleted)
  const stocks = useSelector(getStocksSelector)
  const wallet = useSelector(getWalletSelector)
  const summary = Number((wallet + stocksSummaryPrice).toFixed(1))

  const maxLeverAge = Math.floor( summary / broker.leverAgeMax )
  const minLeverAge = Math.floor( summary / broker.leverAgeMin )

  const [activeMarginStock, setActiveMarginStock] = useState({...stocks.filter(s => s.title === broker.stocks[0].title)[0], count: broker.stocks[0].count})
  // срок кредитования
  const [activeMarginTime, setActiveMarginTime] = useState(broker.timeMin)
  // общее количество акций на покупку...
  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  // общая цена акций на покупку...
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(activeMarginStock.price[activeMarginStock.price.length - 1])
  // переменная для проверки возможности покупки
  const [ableToBuy, setAbleToBuy] = useState(
    stocksToBuyPrice > minLeverAge && 
    stocksToBuyPrice < maxLeverAge && 
    stocksToBuyPrice * broker.commission <= wallet
    )
  // первичная плата за вход на маржу...
  const [commission, setCommision] = useState(Math.floor(stocksToBuyPrice * broker.commission))

  const onCloseClick = () => {
    setIsMarginShown(false)
    dispatch(settingsActions.setTimeSpeed(timeSpeed))
  }

  const onButtonClick = () => {
    dispatch(stocksActions.setInstructionCompleted())
  }

  const setActiveMargin = (stock: stockType) => {
    setActiveMarginStock({...stocks.filter(s => s.title === stock.title)[0], count: stock.count})
  }

  const buyMarginStock = (type: 'short' | 'long') => {
    dispatch(addStocksToPortfolioThunk(activeMarginStock, stocksToBuyCount))
    dispatch(updateBrokerStocksCountThunk(broker, stocksToBuyCount, activeMarginStock.title))
    dispatch(addMarginToPortfolioThunk(activeMarginStock, broker, stocksToBuyCount, activeMarginTime, type))
    dispatch(actions.setWallet(wallet - commission))
    setStocksToBuyCount(0)
    setStocksToBuyPrice(0)
    // dispatch(updateIncome())

    onCloseClick()
  }

  useEffect(() => {
    setAbleToBuy(
      stocksToBuyPrice > minLeverAge && 
      stocksToBuyPrice < maxLeverAge && 
      stocksToBuyCount <= activeMarginStock.count &&
      stocksToBuyPrice * broker.commission <= wallet
      )
      setCommision(Math.floor(stocksToBuyPrice * broker.commission))
  }, [stocksToBuyPrice])

  return (
    <>
      <div className="marginPopup">
        <div className="marginPopupBlock">
          {isInstructionCompleted 
          ? 
            <>
              <div className="marginPopupBlock__Close">
                <CloseOutlined onClick={onCloseClick} />
              </div>
              <div className="marginPopupBlock__Title">
                {broker.name}
              </div>
              <div className="marginPopupBlock__Active">
                <div className="marginPopupBlock__ActiveHeader">
                  Список доступных акций
                </div>
                <div className="marginPopupBlock__ActivePortfolio">
                  <div className="marginPopupBlock__ActivePortfolio__summary">
                    Общая сумма портфеля: <b>${summary}</b>
                  </div>
                  <div className="marginPopupBlock__ActivePortfolio__commission">
                    Комиссия брокера: <b> {broker.commission * 100}% </b>
                    <small>
                      <i>(вы платите этот процент при открытие и закрытие долга...)</i>
                    </small>
                  </div>
                </div>
                <div className="marginPopupBlock__ActiveList">
                  {/* <div className="marginPopupBlock__ActiveList__header"><b>Компании</b></div> */}
                  <div className="marginPopupBlock__ActiveList__stocks">
                    {broker.stocks.map((stock, index) => {
                    return (
                      <div key={index}>
                        {/* TODO  возможно добавить активной акции индекс? */}
                        <Button onClick={() => setActiveMargin(stock)} type={stock.title === activeMarginStock.title ? 'primary' : 'default'}>
                          {stock.title} 
                        </Button>
                      </div>
                    )
                  })}
                  </div>
                </div>
                <div className="marginPopupBlock__ActiveChart">
                  <MarginPopupChart stock={activeMarginStock}/>
                </div>
              </div>
              <MarginPopupMenu 
                stock={activeMarginStock}
                broker={broker}
                ableToBuy={ableToBuy}
                activeMarginTime={activeMarginTime}
                setActiveMarginTime={setActiveMarginTime} 
                setStocksToBuyCount={setStocksToBuyCount}
                setStocksToBuyPrice={setStocksToBuyPrice}
                stocksToBuyCount={stocksToBuyCount}
                buyMarginStock={buyMarginStock}
              />
              <div className="marginPopupBlock__Result">
                <div className="marginPopupBlock__ResultPrice">
                  Размер маржи: 
                  <span className="marginPopupBlock__ResultMin">
                    <b>{' '}${minLeverAge} </b> 
                  </span>
                  - 
                  <span className="marginPopupBlock__ResultMax">
                    <b>{' '}${maxLeverAge}</b>
                  </span>
                </div>
                {/* <div className="marginPopupBlock__ResultMax">
                  Максимальный размер маржи: <b>$</b>
                </div> */}
                <div className="marginPopupBlock__ResultCurrent">
                  Текущая сумма:
                  <b style={ableToBuy ? {color: 'green'} : {color: 'red'}}> 
                    {` $${stocksToBuyPrice}`} 
                  </b>
                </div>
                <div className="marginPopupBlock__ResultCommission">
                  Первичная плата: <b>${commission}</b>
                </div>
              </div>
            </>
          : 
            <>
              <div className="marginPopupBlock__Close">
                <CloseOutlined onClick={onCloseClick} />
              </div>
              <div>
                <div>
                  <h2>Внимание</h2>
                  <p>
                    Маржинальная торговля связана с <b>большими</b> рисками для инвестора. 
                    Поэтому рекомендуем пользоватся этим инстументом с <b>особой</b> осторожностью.
                  </p>
                </div>
                <hr />
                <div>
                  <h2>Для чего мне нужна маржинальная торговля?</h2>
                  <p>
                    На вашем счету недостаточно средств но вы <b>уверены</b> в своем прогнозе
                    относительно каких-либо акций и хотите на этом <b>заработать</b>
                  </p>
                </div>
                <div>
                  <h2>Какой алгоритм действий?</h2>
                  <ol>
                    <li>Вы выбираете брокера и <b>анализируете</b> список акций который он может вам предложить</li>
                    <li>Выбираете подходящую акцию, которая по <b>вашему</b> мнению должна скоро изменится в цене</li>
                    <li>Берете <b>кредит</b> у брокера и платите первоначальную <b>коммисию</b></li>
                    <li>Когда подойдет конец торговой сессии вы должны <b>вернуть</b> брокеру все акции и заплатить <b>коммисию</b> при закрытие долга</li>
                  </ol>
                </div>
                <div>
                  <h2>Размер плеча</h2>
                  <p>Размер плеча показывает <b>максимальное</b> отношение суммы кредита к сумме <b>вашего</b> портфеля</p>
                </div>
                <div>
                  <h2>Комиссия</h2>
                  <ol>
                    <li>При первоначальное покупке акций у брокера вы платите первую коммиссию = <b>Коммисия</b> брокера * <b>общая</b> стоимость акций</li>
                    <li>При закрытие позиции вы платите <b>фиксированную</b> ставку которая указывается в профиле брокера </li>
                  </ol>
                </div>
                <div>
                  <h2>Плата за перенос</h2>
                  <p>Если вы <b>не успели</b> выплатить брокеру весь размер долга к концу сессии то вы будете платить <b>ежедневную</b> плату за перенос</p>
                </div>
                <div>
                  <h2>Торговля в шорт / лонг</h2>
                  <ul>
                    <li>ЛОНГ -{">"} Ждете <b>повышение</b> цен на акции и продаете их, выручка ваша!</li>
                    <li>ШОРТ -{">"} Продаете акции, после чего ждете их <b>снижения</b> цены на рынке. После чего <b>покупаете</b> их по более мальнькой цене и возвращаете брокеру</li>
                  </ul>
                </div>
                <hr />
                <div>
                  <Button onClick={onButtonClick}>
                    Понятно
                  </Button>
                </div>
              </div>
            </>
            }
        </div>
      </div>
    </>
  )
}
export const MarginPopupMenu: FC<MarginPopupMenuType> = ({
  stock, broker, stocksToBuyCount, activeMarginTime, ableToBuy,
  setStocksToBuyCount, setStocksToBuyPrice, setActiveMarginTime, buyMarginStock}) => {

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToBuyCount(1)
      setStocksToBuyPrice(stock.price[stock.price.length - 1])
      return
    }
    if(count > stock.count) {
      setStocksCount(stock.count)
      setStocksToBuyPrice(Math.floor(stock.count * stock.price[stock.price.length - 1]))
      return
    }
    setStocksToBuyCount(count)
    setStocksToBuyPrice(Math.floor(count * stock.price[stock.price.length - 1]))
  }

  return (
    <>
      <div className="marginPopupBlock__Menu">  
        <div className="marginPopupBlock__MenuInfo">
          <div>
          <div className="marginPopupBlock__MenuInfo__Title">
            Доступных акций :  <b>{stock.count}</b>
          </div>

        <div>
          <InputNumber className='marginPopupBlock__MenuInfo__Input' 
            min={0} max={stock.count} 
            value={stocksToBuyCount} 
            onChange={(value) => {
              setStocksToBuyCount(value)
              setStocksToBuyPrice(Math.floor(value * stock.price[stock.price.length - 1]))
            }}
          />
          <button onClick={() => setStocksCount(1)}> min </button>
          <button onClick={() => setStocksCount(stocksToBuyCount - 1)}> -1 </button>
          <button onClick={() => setStocksCount(stocksToBuyCount - 5)}> -5 </button>
          <button onClick={() => setStocksCount(stocksToBuyCount - 10)}> -10 </button>
          <button onClick={() => setStocksCount(stocksToBuyCount + 10)}> +10 </button>
          <button onClick={() => setStocksCount(stocksToBuyCount + 5)}> +5 </button>
          <button onClick={() => setStocksCount(stocksToBuyCount + 1)}> +1 </button>
          <button onClick={() => setStocksCount(stock.count)}> max </button>
        </div>
          </div>
      
      <div className="marginPopupBlock__MenuTime">
        <div className="marginPopupBlock__MenuInfo__Title">
          Срок кредитования: {activeMarginTime} мес.
        </div>
        <Slider min={broker.timeMin} value={activeMarginTime} max={broker.timeMax} onChange={(e) => {setActiveMarginTime(e)}}/>
        <small>
          <i>
            (срок для закрытия позиции)
          </i>
        </small>
        </div>
      </div>
      <div className="marginPopupBlock__MenuButtons">
        <Button disabled={!ableToBuy} onClick={() => buyMarginStock('short')}>Открыть ШОРТ</Button>
        <Button disabled={!ableToBuy} onClick={() => buyMarginStock('long')}>Открыть ЛОНГ</Button>
      </div>
    </div>
    
    </>
  )
}

export const MarginPopupChart: FC<{stock: stockType}> = React.memo(({stock}) => {

  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  const Months = [
    'Январь', '', '', '', 'Февраль', '', '', '', 'Март', '', '', '',
    'Апрель', '', '', '', 'Май', '', '', '', 'Июнь', '', '', '',
    'Июль', '', '', '', 'Август', '', '', '', 'Сентябрь', '', '', '',
    'Октябрь', '', '', '', 'Ноябрь', '', '', '', 'Декабрь', '', '', '',
  ]
  let labels: any[] = []

  // TODO настройка показа графика(неделя / месяц / год / все время)

  stock.price.forEach((price, index) => {
    let labelsCopy = [...labels]
    if(stock.price.length > 48 && index < stock.price.length - 48) {
      return
    }

    labelsCopy.push(price)
    labels = labelsCopy
  })


  const data = {
    labels: Months,
    datasets: [
      {
        label: 'цена за шт.',
        data: labels,
        fill: false,
        // сглаживание . . .
        lineTension: 0.4,
        // цвета . . .
        // backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          // @ts-ignore
          display: true,
        }
      },
      y: {
        grid: {
          // @ts-ignore
          display: true,
        }
      },
    },
  };
  const optionsSmall = {
    scales: {
      x: {
        grid: {
          // @ts-ignore
          display: false,
        }
      },
      y: {
        grid: {
          // @ts-ignore
          display: false,
        }
      },
    },
  };

  return (
    <>
      <Line data={data} options={screenWidth > 768 ? options : optionsSmall} title='цена акций' contextMenu={'Привет'}  />
    </>
  )
})

type MarginPopupMenuType = {
  stock: stockType
  activeMarginTime: number
  stocksToBuyCount: number
  broker: brokerType
  ableToBuy: boolean
  setStocksToBuyCount: (count: number) => void
  setActiveMarginTime: (time: number) => void
  setStocksToBuyPrice: (price: number) => void
  buyMarginStock: (type: 'short' | 'long') => void
  
}

