import { CloseOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setPopupsShownThunk } from "../../../../redux/game-reducer"
import { getWalletSelector } from "../../../../redux/game-selector"
import { updateIncome } from "../../../../redux/profile-reducer"
import { settingsActions } from "../../../../redux/settings-reducer"
import { marginPayOutThunk } from "../../../../redux/stocks-reducer"
import { AppStateType } from "../../../../redux/store"

export const MarginPayBackPopup: FC = () => {
  const dispatch = useDispatch()
  const wallet = useSelector(getWalletSelector)
  const margin = useSelector((state: AppStateType) => state.stocksPage.margin[0])

  const day = useSelector((state: AppStateType) => state.gamePage.daysInMonth)
  const month = useSelector((state: AppStateType) => state.gamePage.month)
  const months = useSelector((state: AppStateType) => state.gamePage.months)

  const stock = useSelector((state: AppStateType) => state.stocksPage.myStocks.filter(s => s.title === margin.stockTitle))

  const [daysToPayBack] = useState(
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
    dispatch(setPopupsShownThunk('margin', false))
    // setIsMarginPayBackShown(false)
    dispatch(settingsActions.setTimeSpeed())
  }

  const onButtonClick = () => {
    // уменьшаем количество акций в марже
    if (stocksToReturnCount === margin.stockCount)
      onCloseClick()
    dispatch(marginPayOutThunk(stocksToReturnCount))
    dispatch(updateIncome())
    // если мы выплачиваем последнии акции то мы платим стоимость за выход из позиции...
  }

  useEffect(() => {
    if(stock.length > 0)
      setIsAbleToReturn(stocksToReturnCount <= stock[0].count)
  }, [stock, stocksToReturnCount])

  return (
    <div className="marginPopup">
      <div className="marginPopupBlock marginPopupPayback">
        <div className="marginPopupBlock__Close">
          <CloseOutlined onClick={onCloseClick} />
        </div>
        <div className="marginPopupBlock__Title">
          {margin.stockTitle} / {margin.type === 'short' ? 'шорт' : 'лонг'}
        </div>
        <div className="marginPopupBlock__Payback">
          <div className="marginPopupBlock__Payback__Time" style={daysToPayBack === 0 ? {border: '2px solid #b71c1c'} : {}}>
            <div className="marginPopupBlock__Payback__TimeExpires" style={daysToPayBack === 0 ? {background: '#b71c1c'} : {}}>
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
            <div className="marginPopupBlock__Payback__TimeFinal" style={daysToPayBack === 0 ? {background: '#b71c1c'} : {}}>
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
              Закрыть позицию: 
              <b>${margin.currentPenalty}</b>
            </div>
            <div className="marginPopupBlock__Payback__PenaltyFinal">
              Плата за перенос: 
              <b>${margin.penaltyPay} / день</b>
            </div>
          </div>
          <div className="marginPopupBlock__Payback__Stock">
            {
              stock.length > 0 
                ? 
                  <>
                    <div className="marginPopupBlock__Payback__StockTitle">{stock[0].title}</div>
                    <div className="marginPopupBlock__Payback__StockCount">{stock[0].count} шт.</div>
                  </> 
                : 'Купите необходимые акции!'
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
  // const dispatch = useDispatch()

  // const timeSpeed = useSelector(getConstTimeSpeedSelector)
  
  // const onChangeTime = (time: number) => {
  //   dispatch(settingsActions.setTimeSpeed(time))
  // }

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
                ? <><span>Необходимо вернуть :</span>  <span><b>{stocksReturnCount}</b> шт.</span></>
                : <><span>Продать :</span> <span><b>{stocksReturnCount} шт.</b></span></>
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