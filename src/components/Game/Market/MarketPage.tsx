import { Tabs } from "antd";
import React, { FC } from "react";
import { useRoutes } from "react-router-dom";
import { brokerType } from "../../../redux/stocks-reducer";
import { BusinessPage } from "./BusinessPage";
import { RealtyPage } from "./RealtyPage";
import { StocksPage } from "./Stocks/StocksPage";

export type MarketType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
  setIsMarginPayBackShown: (isMarginPayBackShown: boolean) => void
  setActiveBroker: (activeBroker: brokerType) => void
  setIsMarginShown: (isMarginShown: boolean) => void
}

export const MarketPage: FC<MarketType> = (props) => {
    const routes = useRoutes([
      {
        path: '/stocks',
        element: 
        <StocksPage 
          setIsHistoryShown={props.setIsHistoryShown}
          setMyActiveStock={props.setMyActiveStock}
          setActiveStock={props.setActiveStock}
          setIsStockToSell={props.setIsStockToSell}
          setActiveBroker={props.setActiveBroker}
          setIsMarginShown={props.setIsMarginShown}
          setIsMarginPayBackShown={props.setIsMarginPayBackShown}
        />
      },
      {
        path: '/',
        index: true,
        element: 
        <StocksPage 
          setIsHistoryShown={props.setIsHistoryShown}
          setMyActiveStock={props.setMyActiveStock}
          setActiveStock={props.setActiveStock}
          setIsStockToSell={props.setIsStockToSell}
          setActiveBroker={props.setActiveBroker}
          setIsMarginShown={props.setIsMarginShown}
          setIsMarginPayBackShown={props.setIsMarginPayBackShown}
        />
      },
      {
        path: '/realty',
        element: <RealtyPage />
      },
      {
        path: '/business',
        element: <BusinessPage />
      }
    ])
    
  return (
    <>
      {routes}
    </>
  )
}