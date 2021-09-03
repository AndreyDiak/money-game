import {Button} from "antd"
import {Tabs} from "antd";
import {Route, Switch} from "react-router-dom";
import {RenderPlayerStocks} from "./RenderPlayerStocks";
import {FC} from "react";
import {NavLink} from "react-router-dom";

const {TabPane} = Tabs

export type MarketType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
}

export const RenderPlayerMarket: FC<MarketType> = (props) => {
  return (
    <>
      <div className="gameMarket bannerBack">
        <div className="gameMarketContent">
          <Tabs className='gameMarketContent__Menu' defaultActiveKey={'4'}>
            <TabPane key={'1'} tab={'Рынок акций'}>
              <RenderPlayerStocks
                setIsHistoryShown={props.setIsHistoryShown}
                setMyActiveStock={props.setMyActiveStock}
                setActiveStock={props.setActiveStock}
                setIsStockToSell={props.setIsStockToSell}
              />
            </TabPane>
            <TabPane key={'2'} tab={'Рынок недвижимости'}>
              Недвижимость
            </TabPane>
            <TabPane key={'3'} tab={'Рынок бизнесса'}>
              Бизнесс
            </TabPane>
            <TabPane key={'4'} tab={'Магазин'}>
              Магазин
            </TabPane>
          </Tabs>
          </div>
        <div>

        </div>

      </div>

    </>
  )
}