import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyStocksSelector, getStocksSelector} from "../../redux/stocks-selector";
import {Button, Input, Popover, Radio, Select, Space} from "antd";
import {AppStateType} from "../../redux/store";
import {filterType, myStockType, stocksActions, stockType} from "../../redux/stocks-reducer";
import {ArrowDownOutlined, ArrowUpOutlined, SlidersOutlined} from "@ant-design/icons";
import { RenderMyStock, StockCard } from "./StockCard";

const {Option} = Select

export type RenderPlayerStocksType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
}

export const StocksPage: FC<RenderPlayerStocksType> = (props) => {
  const dispatch = useDispatch()
  const myStocks: myStockType[] = useSelector(getMyStocksSelector)
  // const stocks: stockType[] = useSelector(getStocksSelector)
  const filteredStocks: stockType[] = useSelector((state: AppStateType) => state.stocksPage.filteredStocks)
  const [isReverse, setIsReverse] = useState(false)

  // хук нужен только для размера под телефон...
  const [isMyStocksShown, setIsMyStocksShown] = useState(true)
  const [isBrokerPopupShown, setIsBrokerPopupShown] = useState(false)
  
  // разрешение экрана...
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  // применяем активнй фильтр к акциям на рынке...
  const filterStocks = (title: filterType ,value: string) => {
    dispatch(stocksActions.filterStocks(title, value))
  }

  const content = (
    <div>
      <Radio.Group defaultValue={'none'} onChange={(e) => filterStocks(e.target.value, '')}>
        <Space direction='vertical'>
          <Radio value={'price'}>По цене</Radio>
          <Radio value={'condition'}>По росту</Radio>
          <Radio value={'dividends'}>Дивиденды</Radio>
          <Radio value={'count'}>По количеству</Radio>
          {/* TODO после покупки подписки */}
          {/*<Radio value={'risk'}>По риску</Radio>*/}
          <Radio value={'none'}>Без фильтра</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  return (
    <>
      <div className="gameProfit bannerBack">
      
        <div className="gameProfitStocks">
            <div className="container">
              {screenWidth > 768
                ? <>
                    <div className="gameProfitStocks__Me">
                      <div className="gameProfitStocks__Header">
                        Ваши акции
                      </div>
                      <div className="gameProfitStocks__OfferBlocks">
                        <div className="gameProfitStocks__OfferBlocks__stocks">
                          {myStocks.map((stock, index) =>
                            <RenderMyStock
                              stock={stock}
                              index={index}
                              setIsHistoryShown={props.setIsHistoryShown}
                              setActiveStock={props.setActiveStock}
                              setMyActiveStock={props.setMyActiveStock}
                              setIsStockToSell={props.setIsStockToSell}
                            />
                          )}
                        </div>

                      </div>
                    </div>
                    <div className="gameProfitStocks__Offer">
                      <div className="gameProfitStocks__Header">
                        Акции на рынке
                      </div>
                      <div className="gameProfitStocks__OfferBlocks">
                        <div className="gameProfitStocks__OfferBlocks__menu">
                          <Input placeholder='Название акции...' className='gameProfitStocks__OfferBlocks__menuInput' onChange={(e) => filterStocks('title',e.target.value)}/>
                          <Popover content={content} trigger="click" title='Фильтр акций'>
                            <Button style={{display: 'flex', alignItems: 'center'}}>Фильтры<SlidersOutlined style={{fontSize: '16px', fontWeight: 'normal'}}/></Button>
                          </Popover>
                          <Button onClick={() => {
                            setIsReverse(!isReverse)
                            dispatch(stocksActions.reverseFilteredStocks())
                          }}>
                            {!isReverse
                              ? <ArrowUpOutlined />
                              : <ArrowDownOutlined />
                            }
                          </Button>
                        </div>
                        <div className="gameProfitStocks__OfferBlocks__stocks">
                          {filteredStocks.map((stock, index) =>
                            <StockCard
                              stock={stock}
                              index={index}
                              setIsHistoryShown={props.setIsHistoryShown}
                              setActiveStock={props.setActiveStock}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                : <>
                  <Button
                    style={{fontWeight: 900, outline: "none", border: '2px solid #fff'}}
                    onClick={() => setIsMyStocksShown(!isMyStocksShown)}
                  >
                    {isMyStocksShown ? 'Рынок акций' : 'Мои акции'}
                  </Button>
                  {isMyStocksShown
                    ? <div className="gameProfitStocks__Me">
                      <div className="gameProfitStocks__Header">
                        Ваши акции
                      </div>
                      <div className="gameProfitStocks__OfferBlocks">
                        <div className="gameProfitStocks__OfferBlocks__stocks">
                          {myStocks.map((stock, index) =>
                            <RenderMyStock
                              stock={stock}
                              index={index}
                              setIsHistoryShown={props.setIsHistoryShown}
                              setActiveStock={props.setActiveStock}
                              setMyActiveStock={props.setMyActiveStock}
                              setIsStockToSell={props.setIsStockToSell}
                            />
                          )}
                        </div>

                      </div>
                    </div>
                    : <div className="gameProfitStocks__Offer">
                      <div className="gameProfitStocks__Header">
                        Акции на рынке
                      </div>
                      <div className="gameProfitStocks__OfferBlocks">
                        <div className="gameProfitStocks__OfferBlocks__menu">
                          <Input placeholder='Название акции...' className='gameProfitStocks__OfferBlocks__menuInput' onChange={(e) => filterStocks('title',e.target.value)}/>
                          <Popover content={content} trigger="click" title='Фильтр акций'>
                            <Button style={{display: 'flex', alignItems: 'center'}}>Фильтры<SlidersOutlined style={{fontSize: '16px', fontWeight: 'normal'}}/></Button>
                          </Popover>
                          <Button onClick={() => {
                            setIsReverse(!isReverse)
                            dispatch(stocksActions.reverseFilteredStocks())
                          }}>
                            {!isReverse
                              ? <ArrowUpOutlined />
                              : <ArrowDownOutlined />
                            }
                          </Button>
                        </div>
                        <div className="gameProfitStocks__OfferBlocks__stocks">
                          {filteredStocks.map((stock, index) =>
                            <StockCard
                              stock={stock}
                              index={index}
                              setIsHistoryShown={props.setIsHistoryShown}
                              setActiveStock={props.setActiveStock}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  }
                  </>
              }

            </div>
        </div>
      </div>
    </>
  )
}