import { CloseOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupsShownThunk } from "../../../../redux/game/game-reducer";
import { settingsActions } from "../../../../redux/settings/settings-reducer";
import { removeStocksFromPortfolioThunk } from "../../../../redux/market/stocks-reducer";
import { AppStateType } from "../../../../redux/store";
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector";
import { popups } from "../../../../redux/game/models";
import { ChartGraph } from "../Chart/ChartGraph/ChartGraph";

export const SellPopup: FC = React.memo(() => {
  // количество акций на продажу . . .
  const [stocksToSellCount, setStocksToSellCount] = useState(1)
  // достаем активную акцию пользователя на продажу...
  const activeStock = useTypedSelector(state => state.gamePage.popups.myStock.active)
  const stock = useTypedSelector(state => state.stocksPage.myStocks[activeStock])

  const stocks = useSelector((state: AppStateType) => state.stocksPage.stocks.filter(s => s.title === stock.title)[0])
  const bonds = useSelector((state: AppStateType) => state.stocksPage.bonds.filter(b => b.title === stock.title)[0])
  const dispatch = useDispatch()

  const onChangeTime = () => {
    dispatch(settingsActions.setTimeSpeed())
  }

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToSellCount(1)
      return
    }
    if(count > stock.count) {
      setStocksToSellCount(stock.count)
      return
    }
    setStocksToSellCount(count)
  }

  const sellStocks = () => {
    onCloseClick()
    //
    dispatch(removeStocksFromPortfolioThunk(stock, stocksToSellCount, activeStock))
  }
  
  const onCloseClick = () => {
    dispatch(setPopupsShownThunk(popups.MY_STOCK, false))
    onChangeTime()
  }
  
  return (
    <>
      <div className="sellPopup">
        <div className="sellPopupBlock">
          <div className="sellPopupBlock__Close">
            <CloseOutlined onClick={onCloseClick} />
          </div>
          <div className="sellPopupBlock__Title">
            <div>Вы хотите продать акции компании:</div>
            <b>{stock.title}</b>
          </div>
          <div>
            {/*  @ts-ignore */}
            <ChartGraph stock={[stocks, bonds].filter(s => s !== undefined)[0]} />
          </div>
          <div className="sellPopupBlock__Menu">
            <div className="sellPopupBlock__MenuInfo">
              <div>
                <div className='sellPopupBlock__MenuInfo__Title' >
                  Кол-во акций в портфеле: <b>{stock.count}</b>
                </div>
                <div className='sellPopupBlock__MenuInfo__Input'>
                  <label htmlFor="">
                    <InputNumber min={1} value={stocksToSellCount} max={stock.count} defaultValue={1} onChange={(value) => setStocksToSellCount(value)}/>
                  </label>
                  <button onClick={() => setStocksCount(1)}> min </button>
                  <button onClick={() => setStocksCount(stocksToSellCount - 1)}> -1 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount - 5)}> -5 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount - 10)}> -10 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount + 10)}> +10 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount + 5)}> +5 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount + 1)}> +1 </button>
                  <button onClick={() => setStocksCount(stock.count)}> max </button>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={sellStocks}>
                Продать
              </Button>
            </div>
          </div>
          <div>
            Вы получите : <b style={stock.oldPrice <= stock.price ? {color: 'rgb(115, 193, 103)'} : {color: "red"}}>
              ${(stocksToSellCount * stock.price).toFixed(2)}
            </b>
            <br/>
            Выручка : <b style={stock.oldPrice <= stock.price ? {color: 'rgb(115, 193, 103)'} : {color: "red"}}>
                ${(stocksToSellCount * stock.price - stocksToSellCount * stock.oldPrice).toFixed(2)}
              </b>
          </div>
        </div>
      </div>
    </>
  )
})