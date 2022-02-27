import { CloseOutlined } from "@ant-design/icons"
import { FC } from "react"
import { AppStateType } from "../../../../redux/store"
import {useSelector} from 'react-redux'
import { stat } from "fs"
type MarginPayBackPopupType = {
  setIsMarginPayBackShown: (isMarginPayBackShown: boolean) => void
}

export const MarginPayBackPopup: FC<MarginPayBackPopupType> = ({
  setIsMarginPayBackShown
}) => {

  const margin = useSelector((state: AppStateType) => state.stocksPage.margin[0])
  const day = useSelector((state: AppStateType) => state.gamePage.daysInMonth)
  const month = useSelector((state: AppStateType) => state.gamePage.month)
  const months = useSelector((state: AppStateType) => state.gamePage.months)

  const onCloseClick = () => {
    setIsMarginPayBackShown(false)
  }

  return (
    <div className="marginPopup">
      <div className="marginPopupBlock">
        <div className="marginPopupBlock__Close">
          <CloseOutlined onClick={onCloseClick} />
        </div>
        <div className="marginPopupBlock__Title">
          {margin.stockTitle}
        </div>
        <div className="marginPopupBlock__Payback">
          <div className="marginPopupBlock__Payback__Time">
            <div className="marginPopupBlock__Payback__TimeExpires">
              До закрытия позиции:
              <b>
                {margin.expiresIn > 1 
                  ? <>{margin.expiresIn} мес.</> 
                  : <>{margin.giveBackData.day - day} дней</>
                }
              </b>
            </div>
            <div className="marginPopupBlock__Payback__TimeFinal">
              {months[margin.giveBackData.month].name}
              {margin.giveBackData.day}
            </div>
          </div>
          <div className="marginPopupBlock__Payback__Penalty">
            <div className="marginPopupBlock__Payback__PenaltyCurrent">
              Закрытие позиции: <b>${margin.currentPenalty}</b>
            </div>
            <div className="marginPopupBlock__Payback__PenaltyFinal">
              Плата за перенос: <b>${margin.penaltyPay} / день</b>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}