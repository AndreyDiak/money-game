import { ArrowDownOutlined, ArrowUpOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";
import React, { FC, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../../../redux/settings-reducer";
import { myStockType, stockType } from "../../../../redux/stocks-reducer";
import { AppStateType } from "../../../../redux/store";

export type RenderStockType = {
  stock: stockType,
  index: number,
  setIsHistoryShown: any,
  setActiveStock: any
}

export type RenderMyStockType = {
  stock: myStockType,
  index: number,
  setIsHistoryShown: any,
  setActiveStock: SetStateAction<any>
  setMyActiveStock: SetStateAction<any>
  setIsStockToSell: SetStateAction<any>
}

export const StockCard: FC<RenderStockType> = (props) => {

  const dispatch = useDispatch()
  const isSubcsriptionBought = useSelector((state: AppStateType) => state.stocksPage.isSubscriptionBought)
  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  return (
    <>
      <div className="gameProfitStocks__OfferBlock">
        <div className="gameProfitStocks__OfferBlock__Title">
          {props.index + 1} - {props.stock.title}
        </div>
        <div className="gameProfitStocks__OfferBlock__Info">
          <div className="gameProfitStocks__OfferBlock__InfoPrice">
            {props.stock.price[props.stock.price.length - 1]}$
          </div>
          {isSubcsriptionBought &&
          <div className="gameProfitStocks__OfferBlock__InfoRisk">
            риск: <b>{props.stock.risk}</b>
          </div>
          }
            {props.stock.dividendsPercentage === 0
              ? ''
              : <div className="gameProfitStocks__OfferBlock__InfoDividends">
                  <span><b>Дивиденды : {props.stock.dividendsPercentage}%</b></span>
                </div>
              }
          <div className="gameProfitStocks__OfferBlock__InfoCondition" style={props.stock.condition === 'up' ? {color: '#51ff3d'} : {color: 'red'}}>
            {props.stock.condition === 'up'
              //@ts-ignore
              ? <b> <RiseOutlined /> </b>
              //@ts-ignore
              : <b> <FallOutlined /> </b>
            }
          </div>
        </div>
        <div>
          <button className="gameProfitStocks__OfferBlock__Button" onClick={() => {
            props.setActiveStock(props.stock)
            props.setIsHistoryShown(true)
            onChangeTime(0)
          }}>
            Посмотреть историю
          </button>
        </div>
      </div>
    </>
  )
}

export const RenderMyStock: FC<RenderMyStockType> = (props) => {

  const dispatch = useDispatch()

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  return (
    <>
      <div className="gameProfitStocks__OfferBlock">
        <div className="gameProfitStocks__OfferBlock__Title">
          {props.index + 1} - {props.stock.title}
        </div>
        <div className="gameProfitStocks__OfferBlock__Info">
          <div className="gameProfitStocks__OfferBlock__InfoPrice">
            {props.stock.price} / {props.stock.oldPrice}
          </div>
          <div className="gameProfitStocks__OfferBlock__InfoCondition" style={props.stock.condition === 'up' ? {color: '#51ff3d'} : {color: 'red'}}>
            {props.stock.condition === 'up'
              //@ts-ignore
              ? <b><ArrowUpOutlined /></b>
              //@ts-ignore
              : <b><ArrowDownOutlined /></b>
            }
          </div>
          <div>
            {props.stock.count} штук
          </div>
          {
            props.stock.dividendsAmount > 0 && 
            <div>
              <b>Дивиденды: </b> 
              ${props.stock.dividendsAmount}
            </div>
          }
        </div>
        <div>
          <button className="gameProfitStocks__OfferBlock__Button" onClick={() => {
            props.setIsStockToSell(true)
            props.setMyActiveStock(props.index)
            onChangeTime(0)
          }}>
            Продать
          </button>
        </div>
      </div>
    </>
  )
}

