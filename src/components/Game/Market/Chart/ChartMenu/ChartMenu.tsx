import { Button, InputNumber } from "antd"
import React from "react"
import { FC } from "react"
import { stockType } from "../../../../../redux/market/typings"

interface RenderChartMenuType  {
  stock: stockType
  stocksToBuyCount: number
  stocksToBuyPrice: number
  isAbleToBuy: boolean
  buyStocks: () => void
  setStocksCount: (count: number) => void
}

export const ChartMenu: FC<RenderChartMenuType> = React.memo(({
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
})