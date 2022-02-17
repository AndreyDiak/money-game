import {Tabs} from "antd"
import {RenderPlayerStocks} from "./RenderPlayerStocks";
import React, {FC} from "react";
import {RealtyPage} from "./RealtyPage";
import {BusinessPage} from "./BusinessPage";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Redirect, Route, Switch} from "react-router-dom";

const {TabPane} = Tabs

export type MarketType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
}

export const RenderPlayerMarket: FC<MarketType> = (props) => {

  const income = useSelector((state: AppStateType) => state.profilePage.income)

  const realtyContent = (
    <div>
      <p>
        Сначала начните зарабатывать <b>$1000 / мес.</b>
      </p>
    </div>
  )
  const businessContent = (
    <div>
      <p>
        Сначала начните зарабатывать <b>$2500 / мес.</b>
      </p>
    </div>
  )

  return (
    <>
      <Switch>
        <Route path='/game/market/stocks' render={() =>
          <RenderPlayerStocks
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