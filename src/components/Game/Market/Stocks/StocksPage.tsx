import React, {FC, useState} from "react";
import {Button, Select} from "antd";
import {MyPortfolio} from "./MyPortfolio";
import {Stocks} from "./Stocks";
import {Bonds} from "./Bonds";
import {Margin} from "./Margin";

export type RenderPlayerStocksType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
}
type MarketType = 'portfolio' | 'stocks' | 'bonds' | 'margin'
export const StocksPage: FC<RenderPlayerStocksType> = ({setIsStockToSell, setMyActiveStock, setActiveStock, setIsHistoryShown}) => {

  // хук нужен только для размера под телефон...
  // const [isMyStocksShown, setIsMyStocksShown] = useState(true)

  const [isBrokerPopupShown, setIsBrokerPopupShown] = useState(false)
  const [marketActiveFilter, setMarketActiveFilter] = useState(1)
  // разрешение экрана...
  const filters = [
    {name: 'Портфель', filter: 'portfolio' as MarketType},
    {name: 'Акции', filter: 'stocks' as MarketType},
    {name: 'Облигации', filter: 'bonds' as MarketType},
    {name: 'Маржинальная торговля', filter: 'margin' as MarketType},
  ]
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  console.log(window.screen.width)
  return (
    <>
      <div className="gameProfit bannerBack">
        <div className="gameProfitStocks">
            <div className="container">
              <div className="gameProfitMenu">
                {filters.map((filter, index) => {
                  return (
                    <>
                      {screenWidth < 768
                        ?
                        <div className="gameProfitMenu__item">
                          <Button onClick={() => setMarketActiveFilter(index)}>{filter.name}</Button>
                        </div>
                        : index !== 0 &&
                        <div className="gameProfitMenu__item">
                          <Button onClick={() => setMarketActiveFilter(index)}>{filter.name}</Button>
                        </div>
                      }
                    </>
                  )
                })}
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
                    <Bonds/>
                  }
                  {marketActiveFilter === 3 &&
                    <Margin setIsBrokerPopupShown={setIsBrokerPopupShown}/>
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
                    <Bonds/>
                  }
                  {marketActiveFilter === 3 &&
                    <Margin setIsBrokerPopupShown={setIsBrokerPopupShown}/>
                  }
                </>
              }
            </div>
        </div>
      </div>
    </>
  )
}