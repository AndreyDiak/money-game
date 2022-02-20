import { CloseOutlined } from "@ant-design/icons"
import { FC, useEffect, useState } from "react"
import { brokerType, stockType } from "../../../../redux/stocks-reducer"
import { useSelector, useDispatch } from 'react-redux'
import { settingsActions } from "../../../../redux/settings-reducer"
import { getConstTimeSpeedSelector } from "../../../../redux/settings-selector"
import { AppStateType } from "../../../../redux/store"
import { Button, InputNumber, Slider } from "antd"
import { getWalletSelector } from "../../../../redux/game-selector"
import { getStocksSelector } from "../../../../redux/stocks-selector"

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

  const [creditAmount, setCreditAmount] = useState(summary * (1 / broker.leverAgeMin))
  const [creditAmountCommission, setCreditAmountCommission] = useState( Math.floor(creditAmount * (1 + broker.commission)) )
  const [aciteMarginStock, setActiveMarginStock] = useState(broker.stocks[0])
  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(0)
  const onCloseClick = () => {
    setIsMarginShown(false)
    dispatch(settingsActions.setTimeSpeed(timeSpeed))
  }

  const onPriceChange = (price: number) => {
    setCreditAmount(price)
  }

  const buyMarginStock = (stock: stockType) => {
    // setIsMarginShown(false)
    setIsHistotyShown(true)
    setActiveStock({...stocks.filter(s => s.title === stock.title)[0], count: stock.count})
  }

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToBuyCount(1)
      setStocksToBuyPrice(aciteMarginStock.price[aciteMarginStock.price.length - 1])
      return
    }
    if(count > aciteMarginStock.count) {
      setStocksCount(aciteMarginStock.count)
      setStocksToBuyPrice(aciteMarginStock.count * aciteMarginStock.price[aciteMarginStock.price.length - 1])
      return
    }
    setStocksToBuyCount(count)
    setStocksToBuyPrice(count * aciteMarginStock.price[aciteMarginStock.price.length - 1])
  }

  useEffect(() => {
    setCreditAmountCommission( Math.floor(creditAmount * (1 + broker.commission)) )
  }, [creditAmount])

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
          <div className="marginPopupBlock__menu">
            <div className="marginPopupBlock__menuSummary">
              Сумма портфеля: <b>${summary}</b>
            </div>
            <div className="marginPopupBlock__menuCommission">
              Комиссия брокера: <b>{broker.commission * 100}%</b>
            </div>
            <div>
              вы берете: {creditAmount}
            </div>
            <div>
              нужно выплатить: {creditAmountCommission}
            </div>
            <div>
              <h1 style={{color: 'red'}}>
                еще не работает
              </h1>
            </div>
            {/* <div>
              Вы можете использовать маржинальную торговлю для торговли в лонг или шорт.
              При торговле в шорт вы зарабатываете на понижении цены акций.
              При торговле в лонг вы зарабатываете на повышении цены акций.
              ВНИМАНИЕ: При окончании срока кредитования вы должны иметь столько же акций, сколько и при покупке.
            </div> */}
            <div>
              {broker.stocks.map((stock, index) => {
                return (
                  <div key={index}>
                    <Button onClick={() => setActiveMarginStock(stock)} type={stock.title === aciteMarginStock.title ? 'primary' : 'default'}>
                      {stock.title} 
                    </Button>
                  </div>
                )
              })}
            </div>
            <div className="marginPopupBlock__Menu">
              <div className="marginPopupBlock__MenuInfo">
                <div className="marginPopupBlock__MenuInfo__Title">
                Доступных акций :  <b>{aciteMarginStock.count}</b>
                </div>
                <div>
                <InputNumber className='marginPopupBlock__MenuInfo__Input' min={0} max={aciteMarginStock.count} value={stocksToBuyCount} onChange={(value) => {
                  setStocksToBuyCount(value)
                  setStocksToBuyPrice(value * aciteMarginStock.price[aciteMarginStock.price.length - 1])
                }}/>
                <button onClick={() => setStocksCount(1)}> min </button>
                <button onClick={() => setStocksCount(stocksToBuyCount - 1)}> -1 </button>
                <button onClick={() => setStocksCount(stocksToBuyCount - 5)}> -5 </button>
                <button onClick={() => setStocksCount(stocksToBuyCount - 10)}> -10 </button>
                <button onClick={() => setStocksCount(stocksToBuyCount + 10)}> +10 </button>
                <button onClick={() => setStocksCount(stocksToBuyCount + 5)}> +5 </button>
                <button onClick={() => setStocksCount(stocksToBuyCount + 1)}> +1 </button>
                <button onClick={() => setStocksCount(aciteMarginStock.count)}> max </button>
                </div>
              </div>
              <div>
                ,kf,,
              </div>
            </div>
            
            {/*  @ts-ignore */}
            {/* <InputNumber addonAfter="шт." width={60} defaultValue={1}/> */}
            {/* <Slider 
              defaultValue={creditAmount}
              // применяем коммисию брокера на значение взятого кредита
              onChange={(value) => onPriceChange(value)} 
              disabled={false} 
              min={summary *  (1 / broker.leverAgeMin)} 
              max={summary * (1 / broker.leverAgeMax)} 
            /> */}

          </div>
        </div>
      </div>
    </>
  )
}

