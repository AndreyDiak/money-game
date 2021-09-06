import {Popover, Tabs} from "antd"
import {RenderPlayerStocks} from "./RenderPlayerStocks";
import React, {FC} from "react";
import {RealtyPage} from "./RealtyPage";
import {BusinessPage} from "./BusinessPage";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

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
      <div className="gameMarket bannerBack">
        <div className="gameMarketContent">
          <Tabs className='gameMarketContent__Menu' defaultActiveKey={'1'}>
            <TabPane key={'1'} tab={'Рынок акций'}>
              <RenderPlayerStocks
                setIsHistoryShown={props.setIsHistoryShown}
                setMyActiveStock={props.setMyActiveStock}
                setActiveStock={props.setActiveStock}
                setIsStockToSell={props.setIsStockToSell}
              />
            </TabPane>
            <TabPane key={'2'} tab={
              <>
                {income >= 1000
                 ? <span>Рынок недвижимости</span>
                 : <Popover trigger="hover" title='Внимание' content={realtyContent}>
                    Рынок недвижимости
                  </Popover>
                }
              </>
            } disabled={income < 1000}>
              <RealtyPage />
            </TabPane>
            <TabPane key={'3'} tab={
              <>
                {income >= 2500
                ? <span>Бизнес</span>
                : <Popover trigger="hover" title='Внимание' content={businessContent}>
                    Бизнес
                  </Popover>}
              </>
            } disabled={income < 2500}>
              <BusinessPage />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}