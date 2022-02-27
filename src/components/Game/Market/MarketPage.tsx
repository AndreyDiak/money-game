import {Tabs} from "antd"
import React, {FC} from "react";
import {RealtyPage} from "./RealtyPage";
import {BusinessPage} from "./BusinessPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {StocksPage} from "./Stocks/StocksPage";
import { brokerType } from "../../../redux/stocks-reducer";

const {TabPane} = Tabs

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

  return (
    <>
      <Switch>
        <Route path='/game/market/stocks' render={() =>
          <StocksPage
            setIsHistoryShown={props.setIsHistoryShown}
            setMyActiveStock={props.setMyActiveStock}
            setActiveStock={props.setActiveStock}
            setIsStockToSell={props.setIsStockToSell}
            setActiveBroker={props.setActiveBroker}
            setIsMarginShown={props.setIsMarginShown}
            setIsMarginPayBackShown={props.setIsMarginPayBackShown}
          />
        }/>
        <Route path='/game/market/realty' render={() => <RealtyPage />}/>
        <Route path='/game/market/business' render={() => <BusinessPage />}/>
        <Redirect to='/game/market/stocks'/>
      </Switch>
    </>
  )
}