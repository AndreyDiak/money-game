import { CloseOutlined } from "@ant-design/icons"
import { FC } from "react"
import { brokerType } from "../../../../redux/stocks-reducer"
import { useSelector, useDispatch } from 'react-redux'
import { settingsActions } from "../../../../redux/settings-reducer"
import { getConstTimeSpeedSelector } from "../../../../redux/settings-selector"
import { AppStateType } from "../../../../redux/store"
import { Slider } from "antd"
import { getWalletSelector } from "../../../../redux/game-selector"

type MarginPopupType = {
  broker: brokerType
  setIsMarginShown: (isMarginShown: boolean) => void
}
export const MarginPopup: FC<MarginPopupType> = ({broker, setIsMarginShown}) => {

  const dispatch = useDispatch()
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  const stocksSummaryPrice = useSelector((state: AppStateType) => state.stocksPage.stocksSummaryPrice)
  const wallet = useSelector(getWalletSelector)
  const summary = Number((wallet + stocksSummaryPrice).toFixed(1))

  const onCloseClick = () => {
    setIsMarginShown(false)
    dispatch(settingsActions.setTimeSpeed(timeSpeed))
  }

  return (
    <>
      <div className="marginPopup">
        <div className="marginPopupBlock">
          <div className="marginPopupBlock__Close">
            <CloseOutlined onClick={onCloseClick} />
          </div>
          <div className="marginPopupBlock__Title">
            {broker.name}
          </div>
          <div className="marginPopupBlock__menu">
            <div className="marginPopupBlock__menuSummary">
              {summary}
            </div>
            <div className="marginPopupBlock__menuCommission">
              {broker.commission * 100}%
            </div>
            <Slider 
              defaultValue={summary * (1 / broker.leverAgeMin)} 
              disabled={false} 
              min={summary *  (1 / broker.leverAgeMin)} 
              max={summary * (1 / broker.leverAgeMax)} 
            />
          </div>
        </div>
      </div>
    </>
  )
}

