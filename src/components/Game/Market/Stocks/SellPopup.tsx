import { CloseOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import React, { FC, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../redux/game-reducer";
import { getWalletSelector } from "../../../../redux/game-selector";
import { updateIncome } from "../../../../redux/profile-reducer";
import { settingsActions } from "../../../../redux/settings-reducer";
import { getConstTimeSpeedSelector } from "../../../../redux/settings-selector";
import { myStockType, removeStocksFromPortfolioThunk, stocksActions } from "../../../../redux/stocks-reducer";
import { AppStateType } from "../../../../redux/store";
import { MarginPopupChart } from "../Margin/MarginPopup";

export type SellPopupType = {
  stock: myStockType
  setIsStockToSell: SetStateAction<any>
  activeStock: number
}
export const SellPopup: FC<SellPopupType> = (props) => {
  // количество акций на продажу . . .
  const [stocksToSellCount, setStocksToSellCount] = useState(1)
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  const stocks = useSelector((state: AppStateType) => state.stocksPage.stocks.filter(s => s.title === props.stock.title)[0])
  const bonds = useSelector((state: AppStateType) => state.stocksPage.bonds.filter(b => b.title === props.stock.title)[0])
  const wallet = useSelector(getWalletSelector)
  const dispatch = useDispatch()

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToSellCount(1)
      return
    }
    if(count > props.stock.count) {
      setStocksToSellCount(props.stock.count)
      return
    }
    setStocksToSellCount(count)
  }

  const sellStocks = () => {
    onCloseClick()
    //
    dispatch(
      removeStocksFromPortfolioThunk(props.stock, stocksToSellCount, props.activeStock)
      )
  }
  
  const onCloseClick = () => {
    props.setIsStockToSell(false)
    onChangeTime(timeSpeed)
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
            <b>{props.stock.title}</b>
          </div>
          <div>
            {/*  @ts-ignore */}
            <MarginPopupChart stock={[stocks, bonds].filter(s => s !== undefined)[0]} />
          </div>
          <div className="sellPopupBlock__Menu">
            <div className="sellPopupBlock__MenuInfo">
              <div>
                <div className='sellPopupBlock__MenuInfo__Title' >
                  Кол-во акций в портфеле: <b>{props.stock.count}</b>
                </div>
                <div className='sellPopupBlock__MenuInfo__Input'>
                  <label htmlFor="">
                    <InputNumber min={1} value={stocksToSellCount} max={props.stock.count} defaultValue={1} onChange={(value) => setStocksToSellCount(value)}/>
                  </label>
                  <button onClick={() => setStocksCount(1)}> min </button>
                  <button onClick={() => setStocksCount(stocksToSellCount - 1)}> -1 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount - 5)}> -5 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount - 10)}> -10 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount + 10)}> +10 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount + 5)}> +5 </button>
                  <button onClick={() => setStocksCount(stocksToSellCount + 1)}> +1 </button>
                  <button onClick={() => setStocksCount(props.stock.count)}> max </button>
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
            Вы получите : <b style={props.stock.oldPrice <= props.stock.price ? {color: 'rgb(115, 193, 103)'} : {color: "red"}}>
              ${(stocksToSellCount * props.stock.price).toFixed(2)}
            </b>
            <br/>
            Выручка : <b style={props.stock.oldPrice <= props.stock.price ? {color: 'rgb(115, 193, 103)'} : {color: "red"}}>
                ${(stocksToSellCount * props.stock.price - stocksToSellCount * props.stock.oldPrice).toFixed(2)}
              </b>
          </div>
        </div>
      </div>
    </>
  )
}