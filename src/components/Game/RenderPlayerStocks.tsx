import {RenderMyStock, RenderStock} from "./RenderStock";
import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getMyStocksSelector, getStocksSelector } from "../../redux/stocks-selector";
import {Button, Input, Popover, Radio, Select, Space} from "antd";
import {AppStateType} from "../../redux/store";
import {filterType, stocksActions, stocksReducer} from "../../redux/stocks-reducer";
import {ArrowDownOutlined, ArrowUpOutlined, SlidersOutlined } from "@ant-design/icons";
const {Option} = Select

export type RenderPlayerStocksType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
}

export const RenderPlayerStocks: FC<RenderPlayerStocksType> = (props) => {
  const dispatch = useDispatch()
  const myStocks = useSelector(getMyStocksSelector)
  const stocks = useSelector(getStocksSelector)
  const filteredStocks = useSelector((state: AppStateType) => state.stocksPage.filteredStocks)
  const [isReverse, setIsReverse] = useState(false)

  const filterStocks = (title: filterType ,value: string) => {
    dispatch(stocksActions.filterStocks(title, value))
  }

  const content = (
    <div>
      <Radio.Group defaultValue={'none'} onChange={(e) => filterStocks(e.target.value, '')}>
        <Space direction='vertical'>
          <Radio value={'price'}>По цене</Radio>
          <Radio value={'condition'}>По росту</Radio>
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
                  <RenderStock
                    stock={stock}
                    index={index}
                    setIsHistoryShown={props.setIsHistoryShown}
                    setActiveStock={props.setActiveStock}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}