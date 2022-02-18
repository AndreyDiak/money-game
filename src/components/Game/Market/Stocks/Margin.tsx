import { brokerType } from "../../../../redux/stocks-reducer"
import { useSelector } from 'react-redux'
import { AppStateType } from "../../../../redux/store"
import { FC, useState } from "react"
import {Button, Popover} from "antd"

type RenderPlayerMarginType = {
    setIsBrokerPopupShown: (isBrokerPopupShown: boolean) => void
}

export const Margin: FC<RenderPlayerMarginType> = ({setIsBrokerPopupShown}) => {

  const brokers: brokerType[] = useSelector((state: AppStateType) => state.stocksPage.brokers)
  const [activeBroker, setActiveBroker] = useState({} as brokerType)

  const onButtonClick = (index: number) => {
      setIsBrokerPopupShown(true)
      setActiveBroker(brokers[index])
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
                      <b className="gameProfitMargin__blockStats__help">?</b>
                    </Popover>}
                  </div>
                  <div className="gameProfitMargin__blockStats__leverAge">
                    <span>Кредитное плечо -  <b>1 к { (1 / broker.leverAgeMax).toFixed(1)}</b></span>
                    {index === 0 &&
                    <Popover content={'Это отношение показывает во сколько раз кредит может превышать стоимость вашего портфеля'}>
                      <b className="gameProfitMargin__blockStats__help">?</b>
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
}
