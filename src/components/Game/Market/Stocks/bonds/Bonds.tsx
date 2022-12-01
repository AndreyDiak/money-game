import { ArrowDownOutlined, ArrowUpOutlined, SlidersOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Radio, Space } from "antd";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filters } from "../../../../../redux/market/stocks/models";
import { stocksActions } from "../../../../../redux/market/stocks/stocks-reducer";
import { BondType, filterType, stockType } from "../../../../../redux/market/stocks/typings";
import { AppStateType } from "../../../../../redux/store";
import { StockCard } from "../StockCard";

export const Bonds: FC = React.memo(() => {

  const filteredBonds: BondType[] = useSelector((state: AppStateType) => state.stocksPage.filteredBonds)
  const [isReverse, setIsReverse] = useState(false)
  const dispatch = useDispatch()
  const content = (
    <div>
      <Radio.Group defaultValue={'none'} onChange={(e) => filterBonds(e.target.value, '')}>
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

  const filterBonds = (title: filterType, value: string) => {
    dispatch(stocksActions.filterBonds(title, value))
  }

  return (
    <>
      <div className="gameProfitStocks__Offer">
        <div className="gameProfitStocks__Header">
          Облигации
        </div>
        <div className="gameProfitStocks__OfferBlocks">
          <div className="gameProfitStocks__OfferBlocks__menu">
            <Input
              placeholder='Название акции...'
              className='gameProfitStocks__OfferBlocks__menuInput'
              onChange={(e) => filterBonds(filters.TITLE, e.target.value)} />
            <Popover content={content} trigger="click" title='Фильтр акций'>
              <Button style={{ display: 'flex', alignItems: 'center' }}>Фильтры<SlidersOutlined style={{ fontSize: '16px', fontWeight: 'normal' }} /></Button>
            </Popover>
            <Button onClick={() => {
              setIsReverse(!isReverse)
              dispatch(stocksActions.reverseFilteredBonds())
            }}>
              {!isReverse
                ? <ArrowUpOutlined />
                : <ArrowDownOutlined />
              }
            </Button>
          </div>
          <div className="gameProfitStocks__OfferBlocks__stocks">
            {filteredBonds.map((bond, index) =>
              <StockCard
                stock={bond as stockType}
                index={index}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
})


