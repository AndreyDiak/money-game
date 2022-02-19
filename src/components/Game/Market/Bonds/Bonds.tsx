import { BondType, stockType } from "../../../../redux/stocks-reducer"
import {useSelector} from 'react-redux'
import { AppStateType } from "../../../../redux/store"
import { FC } from "react"
import { getBondsSelector } from "../../../../redux/stocks-selector"
import { StockCard } from "../Stocks/StockCard"
type BondsType = {
  setIsHistoryShown: (isHistoryShown: boolean) => void
  setActiveStock: (activeStock: BondType) => void
}
export const Bonds: FC<BondsType> = ({setActiveStock, setIsHistoryShown}) => {

  const bonds: BondType[] = useSelector(getBondsSelector)
  
  return (
    <>
       <div className="gameProfitStocks__Offer">
        <div className="gameProfitStocks__Header">
          Облигации
        </div>
        <div className="gameProfitStocks__OfferBlocks">
          {/* <div className="gameProfitStocks__OfferBlocks__menu">
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
          </div> */}
          <div className="gameProfitStocks__OfferBlocks__stocks">
            {bonds.map((bond, index) =>
              <StockCard
                stock={bond as stockType}
                index={index}
                setIsHistoryShown={setIsHistoryShown}
                setActiveStock={setActiveStock}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
