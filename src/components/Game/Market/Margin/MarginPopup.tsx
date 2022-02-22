import { CloseOutlined } from "@ant-design/icons"
import { Button, InputNumber, Slider } from "antd"
import React, { FC, useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { getWalletSelector } from "../../../../redux/game-selector"
import { settingsActions } from "../../../../redux/settings-reducer"
import { getConstTimeSpeedSelector } from "../../../../redux/settings-selector"
import { brokerType, stockType } from "../../../../redux/stocks-reducer"
import { getStocksSelector } from "../../../../redux/stocks-selector"
import { AppStateType } from "../../../../redux/store"

type MarginPopupType = {
  broker: brokerType
  setIsMarginShown: (isMarginShown: boolean) => void
  setIsHistotyShown: (isHistoryShown: boolean) => void
  setActiveStock: (activeStock: stockType) => void
}
export const MarginPopup: FC<MarginPopupType> = ({broker, setIsMarginShown, setIsHistotyShown, setActiveStock}) => {

  const dispatch = useDispatch()
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  const stocksSummaryPrice = useSelector((state: AppStateType) => state.stocksPage.stocksSummaryPrice)
  const stocks = useSelector(getStocksSelector)
  const wallet = useSelector(getWalletSelector)
  const summary = Number((wallet + stocksSummaryPrice).toFixed(1))

  const maxLeverAge = Math.floor( summary / broker.leverAgeMax )
  const minLeverAge = Math.floor( summary / broker.leverAgeMin )

  // const [creditAmount, setCreditAmount] = useState(summary * (1 / broker.leverAgeMin))

  // const [creditAmountCommission, setCreditAmountCommission] = useState( Math.floor(creditAmount * (1 + broker.commission)) )

  const [activeMarginStock, setActiveMarginStock] = useState({...stocks.filter(s => s.title === broker.stocks[0].title)[0], count: broker.stocks[0].count})

  // общее количество акций на покупку...
  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  // общая цена акций на покупку...
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(activeMarginStock.price[activeMarginStock.price.length - 1])
  // срок кредитования
  const [activeMarginTime, setActiveMarginTime] = useState(broker.timeMin)
  // переменная для проверки возможности покупки
  const [ableToBuy, setAbleToBuy] = useState(stocksToBuyPrice > minLeverAge && stocksToBuyPrice < maxLeverAge)

  const onCloseClick = () => {
    setIsMarginShown(false)
    dispatch(settingsActions.setTimeSpeed(timeSpeed))
  }

  const setActiveMargin = (stock: stockType) => {
    setActiveMarginStock({...stocks.filter(s => s.title === stock.title)[0], count: stock.count})
  }

  const buyMarginStock = () => {
    // add stocks to my stocks
    // update broker portfolio
    // indexing salary
    // add info about margin
  }

  useEffect(() => {
    setAbleToBuy(stocksToBuyPrice > minLeverAge && stocksToBuyPrice < maxLeverAge)
  }, [stocksToBuyPrice])

  return (
    <>
      <div className="marginPopup">
        <div className="marginPopupBlock">
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
                  <i>(вы платите этот процент от разницы цен акций на входе и выходе )</i>
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
          />
          <div className="marginPopupBlock__Result">
            <div className="marginPopupBlock__ResultMin">
              Минимальный размер маржи: <b>${minLeverAge}</b>
            </div>
            <div className="marginPopupBlock__ResultMax">
              Максимальный размер маржи: <b>${maxLeverAge}</b>
            </div>
            <div className="marginPopupBlock__ResultCurrent">
              Текущая сумма:
              <b style={ableToBuy ? {color: 'green'} : {color: 'red'}}> 
                {` $${stocksToBuyPrice}`} 
              </b>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
type MarginPopupMenuType = {
  stock: stockType
  activeMarginTime: number
  stocksToBuyCount: number
  broker: brokerType
  ableToBuy: boolean
  setStocksToBuyCount: (count: number) => void
  setActiveMarginTime: (time: number) => void
  setStocksToBuyPrice: (price: number) => void
  
}
export const MarginPopupMenu: FC<MarginPopupMenuType> = ({
  stock, broker, stocksToBuyCount, activeMarginTime, ableToBuy,
  setStocksToBuyCount, setStocksToBuyPrice, setActiveMarginTime}) => {

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
              setStocksToBuyPrice(value * stock.price[stock.price.length - 1])
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
          Срок кредитования: 
        </div>
        <Slider min={broker.timeMin} value={activeMarginTime} max={broker.timeMax} tooltipVisible onChange={(e) => {setActiveMarginTime(e)}}/>
        <small>
          <i>
            (через этот срок[мес] брокер спишет акции с вашего портфеля)
          </i>
        </small>
      </div>
      </div>
      
      <div>
        <Button disabled={!ableToBuy}>Купить</Button>
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


