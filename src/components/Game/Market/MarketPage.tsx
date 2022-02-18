import {Tabs} from "antd"
import React, {FC} from "react";
import {RealtyPage} from "./RealtyPage";
import {BusinessPage} from "./BusinessPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {StocksPage} from "./Stocks/StocksPage";

const {TabPane} = Tabs

export type MarketType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
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
          />
        }/>
        <Route path='/game/market/realty' render={() => <RealtyPage />}/>
        <Route path='/game/market/business' render={() => <BusinessPage />}/>
        <Redirect to='/game/market/stocks'/>
      </Switch>
    </>
  )
}