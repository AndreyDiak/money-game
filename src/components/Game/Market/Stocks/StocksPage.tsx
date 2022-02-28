import { Button, Select } from "antd";
import React, { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { settingsActions } from "../../../../redux/settings-reducer";
import { brokerType } from "../../../../redux/stocks-reducer";
import { AppStateType } from "../../../../redux/store";
import { Bonds } from "../Bonds/Bonds";
import { Margin } from "../Margin/Margin";
import { MyPortfolio } from "./MyPortfolio";
import { Stocks } from "./Stocks";
const {Option} = Select
export type RenderPlayerStocksType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
  setIsMarginPayBackShown: (isMarginPayBackShown: boolean) => void
  setActiveBroker: (activeBroker: brokerType) => void
  setIsMarginShown: (isMarginShown: boolean) => void
}
type MarketType = 'portfolio' | 'stocks' | 'bonds' | 'margin'

export const StocksPage: FC<RenderPlayerStocksType> = ({
  setIsStockToSell, setMyActiveStock, setActiveStock, 
  setIsHistoryShown, setActiveBroker, setIsMarginShown, setIsMarginPayBackShown}) => {
  
  const dispatch = useDispatch()
  const [marketActiveFilter, setMarketActiveFilter] = useState(1)
  const margin = useSelector((state: AppStateType) => state.stocksPage.margin)
  // разрешение экрана...
  const filters = [
    {name: 'Портфель', filter: 'portfolio' as MarketType},
    {name: 'Акции', filter: 'stocks' as MarketType},
    {name: 'Облигации', filter: 'bonds' as MarketType},
    {name: 'Маржинальная торговля', filter: 'margin' as MarketType},
  ]
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  
  const onMarginClick = () => {
    dispatch(settingsActions.setTimeSpeed(0))
    setIsMarginPayBackShown(true)
  }

  return (
    <>
      <div className="gameProfit bannerBack">
        <div className="gameProfitStocks">
            <div className="container">
              <div className="gameProfitMenu">
                {
                  screenWidth > 768 &&
                  <>
                    {filters.map((filter, index) => {
                      return (
                        <>
                          {index !== 0 &&
                            <div className="gameProfitMenu__item">
                              <Button onClick={() => setMarketActiveFilter(index)}>{filter.name}</Button>
                            </div>
                          }
                        </>
                      )
                    })}
                  </>
                }
                {screenWidth < 768 &&
                <Select defaultValue={0} onChange={(value) => setMarketActiveFilter(value)}>
                  {filters.map((f,i) => {
                    return <Option value={i}>{f.name}</Option>
                  })}
                </Select>
                }
                
              </div>
              <div className="gameProfitDanger">
                {margin.length > 0 && 
                <Button onClick={onMarginClick}>Закрыть позицию</Button>}
              </div>
              {screenWidth > 768
                ? <>
                    <MyPortfolio
                      setIsHistoryShown={setIsHistoryShown}
                      setActiveStock={setActiveStock}
                      setMyActiveStock={setMyActiveStock}
                      setIsStockToSell={setIsStockToSell}
                    />
                  {marketActiveFilter === 1 &&
                    <Stocks
                      setIsHistoryShown={setIsHistoryShown}
                      setActiveStock={setActiveStock}
                    />
                  }
                  {marketActiveFilter === 2 &&
                    <Bonds 
                      setActiveStock={setActiveStock}
                      setIsHistoryShown={setIsHistoryShown}
                    />
                  }
                  {marketActiveFilter === 3 &&
                    <Margin 
                      setActiveBroker={setActiveBroker}
                      setIsMarginShown={setIsMarginShown}
                    />
                  }
                </>
                : <>
                  {marketActiveFilter === 0 &&
                    <MyPortfolio
                      setIsHistoryShown={setIsHistoryShown}
                      setActiveStock={setActiveStock}
                      setMyActiveStock={setMyActiveStock}
                      setIsStockToSell={setIsStockToSell}
                    />
                  }
                  {marketActiveFilter === 1 &&
                    <Stocks
                      setIsHistoryShown={setIsHistoryShown}
                      setActiveStock={setActiveStock}
                    />
                  }
                  {marketActiveFilter === 2 &&
                    <Bonds 
                      setActiveStock={setActiveStock}
                      setIsHistoryShown={setIsHistoryShown}
                    />
                  }
                  {marketActiveFilter === 3 &&
                    <Margin 
                      setActiveBroker={setActiveBroker}
                      setIsMarginShown={setIsMarginShown}
                  />
                  }
                </>
              }
            </div>
        </div>
      </div>
    </>
  )
}