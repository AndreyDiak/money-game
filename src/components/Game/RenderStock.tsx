import React, { FC, SetStateAction} from "react"
import {ArrowDownOutlined, ArrowUpOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons"
import {myStockType, stockType } from "../../redux/stocks-reducer"

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

export const RenderStock: FC<RenderStockType> = (props) => {

  return (
    <>
      <div className="gameProfitStocks__OfferBlock">
        <div className="gameProfitStocks__OfferBlock__Title">
          {props.index + 1} - {props.stock.title}
        </div>
        <div className="gameProfitStocks__OfferBlock__Info">
          <div className="gameProfitStocks__OfferBlock__InfoPrice">
            {props.stock.price[props.stock.price.length - 1]}
          </div>
          <div className="gameProfitStocks__OfferBlock__InfoRisk">
            {props.stock.risk}
          </div>
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
          }}>
            Посмотреть историю
          </button>
        </div>
      </div>
    </>
  )
}

export const RenderMyStock: FC<RenderMyStockType> = (props) => {

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
        </div>
        <div>
          <button className="gameProfitStocks__OfferBlock__Button" onClick={() => {
            props.setIsStockToSell(true)
            props.setMyActiveStock(props.index)
          }}>
            Продать
          </button>
        </div>
      </div>
    </>
  )
}

