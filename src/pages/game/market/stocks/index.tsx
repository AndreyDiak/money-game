import { Button, Select } from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from 'react-redux';
import { setPopupsShownThunk } from "../../../../redux/game-reducer";
import { settingsActions } from "../../../../redux/settings-reducer";
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector";
import { Bonds } from "../../../../components/game/market/Bonds/Bonds";
import { Margin } from "../../../../components/game/market/Margin/Margin";
import { MyPortfolio } from "../../../../components/game/market/Stocks/MyPortfolio";
import { Stocks } from "../../../../components/game/market/Stocks/Stocks";
const {Option} = Select


type MarketType = 'portfolio' | 'stocks' | 'bonds' | 'margin'

const StocksPage: FC = React.memo(() => {
  
  const dispatch = useDispatch()
  const [marketActiveFilter, setMarketActiveFilter] = useState(1)
  const margin = useTypedSelector(state => state.stocksPage.margin)
  // разрешение экрана...
  const filters = [
    {name: 'Портфель', filter: 'portfolio' as MarketType},
    {name: 'Акции', filter: 'stocks' as MarketType},
    {name: 'Облигации', filter: 'bonds' as MarketType},
    {name: 'Маржинальная торговля', filter: 'margin' as MarketType},
  ]
  const [screenWidth] = useState(window.screen.width)
  
  const onMarginClick = () => {
    dispatch(settingsActions.setTimeSpeed(0))
    dispatch(setPopupsShownThunk('margin', true))
  }
  const onHistoryClick = () => {
    dispatch(settingsActions.setTimeSpeed(0))
    dispatch(setPopupsShownThunk('history', true))
  }
  return (
    <>
      <div className="gameProfit bannerBack">
        <div className="gameProfitStocks">
            <div className="container">
              <div className="gameProfitMenu">
                <div className="gameProfitMenu__History">
                  <Button onClick={onHistoryClick}>История</Button>
                </div>
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
                {screenWidth <= 768 &&
                <Select defaultValue={1} onChange={(value) => setMarketActiveFilter(value)}>
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
                  {/* 2 columns */}
                    <MyPortfolio />
                  {marketActiveFilter === 1 &&
                    <Stocks />
                  }
                  {marketActiveFilter === 2 &&
                    <Bonds />
                  }
                  {marketActiveFilter === 3 &&
                    <Margin />
                  }
                </>
                : <>
                  {/* 1 column */}
                  {marketActiveFilter === 0 &&
                    <MyPortfolio />
                  }
                  {marketActiveFilter === 1 &&
                    <Stocks />
                  }
                  {marketActiveFilter === 2 &&
                    <Bonds />
                  }
                  {marketActiveFilter === 3 &&
                    <Margin />
                  }
                </>
              }
            </div>
        </div>
      </div>
    </>
  )
})

export default StocksPage;