import { ArrowDownOutlined, ArrowUpOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupsActiveThunk, setPopupsShownThunk } from "../../../../redux/game/game-reducer";
import { popups } from "../../../../redux/game/models";
import { myStockType, stockType } from "../../../../redux/market/typings";
import { settingsActions } from "../../../../redux/settings/settings-reducer";
import { AppStateType } from "../../../../redux/store";


export const StockCard: FC<RenderStockType> = React.memo(({stock, index}) => {

  const dispatch = useDispatch()
  const isSubcsriptionBought = useSelector((state: AppStateType) => state.stocksPage.isSubscriptionBought)

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const onStockClick = () => {
    dispatch(setPopupsActiveThunk(popups.STOCK, stock))
    dispatch(setPopupsShownThunk(popups.STOCK, true))
    onChangeTime(0)
  }

  return (
    <>
      <div className="gameProfitStocks__OfferBlock">
        <div className="gameProfitStocks__OfferBlock__Title">
          {index + 1} - {stock.title}
        </div>
        <div className="gameProfitStocks__OfferBlock__Info">
          <div className="gameProfitStocks__OfferBlock__InfoPrice">
            {stock.price[stock.price.length - 1]}$
          </div>
          {isSubcsriptionBought &&
          <div className="gameProfitStocks__OfferBlock__InfoRisk">
            риск: <b>{stock.risk}</b>
          </div>
          }
            {stock.dividendsPercentage === 0
              ? ''
              : <div className="gameProfitStocks__OfferBlock__InfoDividends">
                  <span><b>Дивиденды : {stock.dividendsPercentage}%</b></span>
                </div>
              }
          <div className="gameProfitStocks__OfferBlock__InfoCondition" style={stock.condition === 'up' ? {color: '#51ff3d'} : {color: 'red'}}>
            {stock.condition === 'up'
              ? <b> <RiseOutlined /> </b>
              : <b> <FallOutlined /> </b>
            }
          </div>
        </div>
        <div>
          <button className="gameProfitStocks__OfferBlock__Button" onClick={onStockClick}>
            Посмотреть историю
          </button>
        </div>
      </div>
    </>
  )
})

export const RenderMyStock: FC<RenderMyStockType> = React.memo(({myStock, index}) => {

  const dispatch = useDispatch()

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const onMyStockClick = () => {
    dispatch(setPopupsActiveThunk(popups.MY_STOCK, index))
    dispatch(setPopupsShownThunk(popups.MY_STOCK, true))
    onChangeTime(0)
  }

  return (
    <>
      <div className="gameProfitStocks__OfferBlock">
        <div className="gameProfitStocks__OfferBlock__Title">
          {index + 1} - {myStock.title}
        </div>
        <div className="gameProfitStocks__OfferBlock__Info">
          <div className="gameProfitStocks__OfferBlock__InfoPrice">
            {myStock.price} / {myStock.oldPrice}
          </div>
          <div className="gameProfitStocks__OfferBlock__InfoCondition" style={myStock.condition === 'up' ? {color: '#51ff3d'} : {color: 'red'}}>
            {myStock.condition === 'up'
              ? <b><ArrowUpOutlined /></b>
              : <b><ArrowDownOutlined /></b>
            }
          </div>
          <div>
            {myStock.count} штук
          </div>
          {
            myStock.dividendsAmount > 0 && 
            <div>
              <b>Дивиденды: </b> 
              ${myStock.dividendsAmount}
            </div>
          }
        </div>
        <div>
          <button className="gameProfitStocks__OfferBlock__Button" onClick={onMyStockClick}>
            Продать
          </button>
        </div>
      </div>
    </>
  )
})

export interface RenderStockType {
  stock: stockType
  index: number
}

export interface RenderMyStockType {
  myStock: myStockType,
  index: number,
}
