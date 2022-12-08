import { Button, Popover } from "antd"
import React, { FC } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setPopupsActiveThunk, setPopupsShownThunk } from "../../../../../redux/game/game-reducer"
import { settingsActions } from "../../../../../redux/settings/settings-reducer"
import { getBrokersSelector } from "../../../../../redux/market/stocks-selector"
import { brokerType } from "../../../../../redux/market/typings"
import { popups } from "../../../../../redux/game/models"

export const MarginList: FC = React.memo(({}) => {
  
  const dispatch = useDispatch()
  const brokers: brokerType[] = useSelector(getBrokersSelector)
  // TODO
  // const [activeBroker, setActiveBroker] = useState({} as brokerType)

  const onButtonClick = (index: number) => {
    dispatch(setPopupsShownThunk(popups.BROKER, true))
    dispatch(setPopupsActiveThunk(popups.BROKER, brokers[index]))
    dispatch(settingsActions.setTimeSpeed(0))
  }
  return (
    <>
      <div className="gameProfitMargin">
        {brokers.map((broker, index) => {
          return (
            <>
              <div className="gameProfitMargin__block">
                <div className="gameProfitMargin__blockAbout">
                  <div className="gameProfitMargin__blockAbout__name">
                    {broker.name}
                  </div>
                  <div className="gameProfitMargin__blockAbout__age">
                    <b>{broker.age}</b> лет
                  </div>
                </div>
                <div className="gameProfitMargin__blockStats">
                  <div className="gameProfitMargin__blockStats__commission">
                    <span>Коммисия - <b>{broker.commission * 100} %</b></span>
                    {index === 0 &&
                    <Popover content={'Процент от выручки / потери который мы платим брокеру... '}>
                      <b className="gameProfitMargin__blockStats__help">
                        <span>?</span>
                      </b>
                    </Popover>}
                  </div>
                  <div className="gameProfitMargin__blockStats__leverAge">
                    <span>Плечо -  <b>1 к { (1 / broker.leverAgeMax).toFixed(1)}</b></span>
                    {index === 0 &&
                    <Popover content={'Это отношение показывает во сколько раз кредит может превышать стоимость вашего портфеля'}>
                      <b className="gameProfitMargin__blockStats__help">
                        <span>?</span>
                      </b>
                    </Popover>}
                  </div>
                </div>
                <div className="gameProfitMargin__blockButton">
                  <Button onClick={() => onButtonClick(index)}>
                    Подробнее
                  </Button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
})
