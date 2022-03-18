import { CloseOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import React, { FC, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../redux/game-reducer";
import { getWalletSelector } from "../../../../redux/game-selector";
import { settingsActions } from "../../../../redux/settings-reducer";
import { addStocksToPortfolioThunk, stocksActions, stockType } from "../../../../redux/stocks-reducer";
import { MarginPopupChart } from "../Margin/MarginPopup";

export type RenderChartType = {
  setIsHistoryShown: SetStateAction<any>
  stock: stockType
}

export const Chart: FC<RenderChartType> = ({setIsHistoryShown, stock}) => {

  const dispatch = useDispatch()
  const wallet = useSelector(getWalletSelector)
  // массив с акциями . . .

  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(stock.price[stock.price.length - 1])
  const [isAbleToBuy, setIsAbleToBuy] = useState(
    !(stocksToBuyPrice <= wallet)
    || stock.count <= 0
    || stocksToBuyCount < 1
    || stocksToBuyCount > stock.count
  )
  const buyStocks = () => {
    dispatch(actions.setWallet(Math.round(wallet - stocksToBuyPrice)))
    updateStocksCount()
    dispatch(addStocksToPortfolioThunk(stock, stocksToBuyCount))
    setStocksToBuyCount(0)
    setStocksToBuyPrice(0)
    onCloseClick()
  }

  const updateStocksCount = () => {
    // обновляем данные по количеству акций . . .
    dispatch(stocksActions.updateStocks(stock.title, stocksToBuyCount))
  }

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToBuyCount(1)
      setStocksToBuyPrice(stock.price[stock.price.length - 1])
      return
    }
    if(count > stock.count) {
      setStocksCount(stock.count)
      setStocksToBuyPrice(stock.count * stock.price[stock.price.length - 1])
      return
    }
    setStocksToBuyCount(count)
    setStocksToBuyPrice(count * stock.price[stock.price.length - 1])
  }
  // закрытие окна...
  const onCloseClick = () => {
    setIsHistoryShown(false)
    dispatch(settingsActions.setTimeSpeed())
  }
  // проверка возможности покупки акций...
  useEffect(() => {
    setIsAbleToBuy(
      !(stocksToBuyPrice <= wallet)
        || stock.count <= 0
        || stocksToBuyCount < 1
        || stocksToBuyCount > stock.count
    )
  }, [stocksToBuyCount, stocksToBuyPrice])

  return (
    <>
      <div className="chartPopup">
        <div className="chartPopupBlock">
          <div className="chartPopupBlock__Close" onClick={onCloseClick}>
            <CloseOutlined/>
          </div>
          <div className="chartPopupBlock__Title">
            <div>График с ценой на акции компании:</div>
            <b>{stock.title}</b>
          </div>
          {/* рисуем график с ценой на акции . . . */}
          <MarginPopupChart stock={stock} />
          <RenderChartMenu stock={stock} stocksToBuyCount={stocksToBuyCount} stocksToBuyPrice={stocksToBuyPrice} isAbleToBuy={isAbleToBuy} buyStocks={buyStocks} setStocksCount={setStocksCount} />
        </div>
      </div>
    </>
  )
}

type RenderChartMenuType = {
  stock: stockType
  stocksToBuyCount: number
  stocksToBuyPrice: number
  isAbleToBuy: boolean
  buyStocks: () => void
  setStocksCount: (count: number) => void
}

export const RenderChartMenu: FC<RenderChartMenuType> = ({
  stock, stocksToBuyCount, stocksToBuyPrice, isAbleToBuy, 
  buyStocks, setStocksCount
}) => {

  return (
    <>
      <div className='chartPopupBlock__Menu'>
        <div className="chartPopupBlock__MenuInfo">
          <div>
            <div className="chartPopupBlock__MenuInfo__Title">
              Доступных акций :  <b>{stock.count}</b>
            </div>
            <div>
              <InputNumber className='chartPopupBlock__MenuInfo__Input' min={0} max={stock.count} value={stocksToBuyCount} onChange={(value) => setStocksCount(value)} />
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
        </div>
        <div>
          <Button
            size='large'
            disabled={isAbleToBuy}
            onClick={buyStocks}
          >
            Купить
          </Button>
        </div>
      </div>
      <div>
        Вы заплатите : <b>${(stocksToBuyPrice).toFixed(1)}</b>
      </div>
      {stock.dividendsPercentage !== 0
        ? <div>
            Дивиденды : <b>${(stock.dividendsAmount * stocksToBuyCount).toFixed(2)} / мес.</b>
          </div>
        : ''
      }

    </>
  )
}

