import { CloseOutlined } from "@ant-design/icons"
import { FC, SetStateAction, useEffect, useState } from "react"
import { AppStateType } from "../../../../redux/store"
import {useSelector, useDispatch} from 'react-redux'
import { stat } from "fs"
import { getConstTimeSpeedSelector } from "../../../../redux/settings-selector"
import { settingsActions } from "../../../../redux/settings-reducer"
import { Button, InputNumber } from "antd"
import { marginPayOutThunk, stockType } from "../../../../redux/stocks-reducer"
import { getWalletSelector } from "../../../../redux/game-selector"
type MarginPayBackPopupType = {
  setIsMarginPayBackShown: (isMarginPayBackShown: boolean) => void
}

export const MarginPayBackPopup: FC<MarginPayBackPopupType> = ({
  setIsMarginPayBackShown
}) => {
  const dispatch = useDispatch()
  const wallet = useSelector(getWalletSelector)
  const margin = useSelector((state: AppStateType) => state.stocksPage.margin[0])
  const timeSpeed = useSelector(getConstTimeSpeedSelector)

  const day = useSelector((state: AppStateType) => state.gamePage.daysInMonth)
  const month = useSelector((state: AppStateType) => state.gamePage.month)
  const months = useSelector((state: AppStateType) => state.gamePage.months)

  const stock = useSelector((state: AppStateType) => state.stocksPage.myStocks.filter(s => s.title === margin.stockTitle))

  const [daysToPayBack, setDaysToPayBack] = useState(
    margin.expiresIn > 0 
      ? month === margin.giveBackData.month 
        ? margin.giveBackData.day - day 
        : months[month].duration - day + margin.giveBackData.day 
      : 0)
  const [stocksToReturnCount, setStocksToReturnCount] = useState(1) 
  const [isAbleToReturn, setIsAbleToReturn] = useState(
    stock.length > 0 
      ? stocksToReturnCount <= stock[0].count && wallet >= margin.currentPenalty
      : false
    )

  const onCloseClick = () => {
    setIsMarginPayBackShown(false)
    dispatch(settingsActions.setTimeSpeed(timeSpeed))
  }

  const onButtonClick = () => {
    // уменьшаем количество акций в марже
    if (stocksToReturnCount === margin.stockCount)
      onCloseClick()
    dispatch(marginPayOutThunk(stocksToReturnCount))
    // если мы выплачиваем последнии акции то мы платим стоимость за выход из позиции...
  }

  useEffect(() => {
    if(stock.length > 0)
      setIsAbleToReturn(stocksToReturnCount <= stock[0].count)
  }, [stocksToReturnCount])

  return (
    <div className="marginPopup">
      <div className="marginPopupBlock">
        <div className="marginPopupBlock__Close">
          <CloseOutlined onClick={onCloseClick} />
        </div>
        <div className="marginPopupBlock__Title">
          {margin.stockTitle} / {margin.type === 'short' ? 'шорт' : 'лонг'}
        </div>
        <div className="marginPopupBlock__Payback">
          <div className="marginPopupBlock__Payback__Time">
            <div className="marginPopupBlock__Payback__TimeExpires">
              {
                daysToPayBack > 0 
                ? <>
                  До закрытия позиции:
                  <b>
                    {margin.expiresIn > 1 
                      ? <> {margin.expiresIn} мес.</> 
                      : <> {daysToPayBack} дней</>
                    }
                  </b>
                  </> 
                : <>
                    <b> Необходимо закрыть позицию</b>
                  </>
              }
            </div>
            <div className="marginPopupBlock__Payback__TimeFinal">
              Закрыть до: 
              {' '}
              <b>
                {months[margin.giveBackData.month].name}
                {' '}
                {margin.giveBackData.day}
              </b>
            </div>
          </div>
          <div className="marginPopupBlock__Payback__Penalty">
            <div className="marginPopupBlock__Payback__PenaltyCurrent">
              Стоимость закрытия позиции: <b>${margin.currentPenalty}</b>
            </div>
            <div className="marginPopupBlock__Payback__PenaltyFinal">
              Плата за перенос: <b>${margin.penaltyPay} / день</b>
            </div>
          </div>
          <div className="marginPopupBlock__Payback__Stock">
            {
              stock.length > 0 
                ? 
                  <>
                    <div className="marginPopupBlock__Payback__StockTitle">{stock[0].title}</div>
                    <div className="marginPopupBlock__Payback__StockCount">{stock[0].count}</div>
                  </> 
                : ''
            }
          </div>
          <div className="marginPopupBlock__Payback__Menu">
            <MarginPayBackMenu 
              stocksReturnCount={margin.stockCount} 
              stocksToReturnCount={stocksToReturnCount}
              isAbleToReturn={isAbleToReturn}
              type={margin.type}
              returnStock={onButtonClick} 
              setStocksToReturnCount={setStocksToReturnCount}
            />
          </div>
        </div>
      </div>
    </div>  
  )
}

type MarginPayBackMenuType = {
  stocksReturnCount: number
  stocksToReturnCount: number
  isAbleToReturn: boolean
  type: 'short' | 'long'
  returnStock: () => void
  setStocksToReturnCount: (stocksToReturnCount: number) => void
}

export const MarginPayBackMenu: FC<MarginPayBackMenuType> = ({
  stocksReturnCount, stocksToReturnCount, isAbleToReturn, type,
  setStocksToReturnCount, returnStock
}) => {

  // const wallet = useSelector(getWalletSelector)
  const dispatch = useDispatch()

  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  
  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToReturnCount(1)
      return
    }
    if(count > stocksReturnCount) {
      setStocksCount(stocksReturnCount)
      return
    }
    setStocksToReturnCount(count)
  }

  return (
    <>
      <div className='chartPopupBlock__Menu'>
        <div className="chartPopupBlock__MenuInfo">
          <div>
            <div className="chartPopupBlock__MenuInfo__Title">
              {type === 'short' 
                ? <>Необходимо вернуть :  <b>{stocksReturnCount}</b> шт.</>
                : <>Продать : <b>{stocksReturnCount} шт.</b></>
              }
              
            </div>
            <div>
              <InputNumber className='chartPopupBlock__MenuInfo__Input' min={1} max={stocksReturnCount} value={stocksToReturnCount} onChange={(value) => {
                setStocksToReturnCount(value)
              }}/>
              <button onClick={() => setStocksCount(1)}> min </button>
              <button onClick={() => setStocksCount(stocksToReturnCount - 1)}> -1 </button>
              <button onClick={() => setStocksCount(stocksToReturnCount - 5)}> -5 </button>
              <button onClick={() => setStocksCount(stocksToReturnCount - 10)}> -10 </button>
              <button onClick={() => setStocksCount(stocksToReturnCount + 10)}> +10 </button>
              <button onClick={() => setStocksCount(stocksToReturnCount + 5)}> +5 </button>
              <button onClick={() => setStocksCount(stocksToReturnCount + 1)}> +1 </button>
              <button onClick={() => setStocksCount(stocksReturnCount)}> max </button>
            </div>
          </div>
        </div>
        <div>
            <Button
              size='large'
              disabled={!isAbleToReturn}
              onClick={returnStock}>
              Вернуть
            </Button>
        </div>
      </div>
     
    </>
  )
}