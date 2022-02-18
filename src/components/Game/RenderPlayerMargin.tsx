import { brokerType } from "../../redux/stocks-reducer"
import { useSelector } from 'react-redux'
import { AppStateType } from "../../redux/store"
import { FC, useState } from "react"

type RenderPlayerMarginType = {
    setIsBrokerPopupShown: (isBrokerPopupShown: boolean) => void
}

export const RenderPlayerMargin: FC<RenderPlayerMarginType> = ({setIsBrokerPopupShown}) => {

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
                        {broker.age}
                    </div>
                </div>
                <div className="gameProfitMargin__blockStats">
                    <div className="gameProfitMargin__blockStats__commision">
                        {broker.comission}
                    </div>
                    <div className="gameProfitMargin__blockStats__leverAge">
                        {broker.leverAgeMax}
                    </div>
                </div>
                <div className="gameProfitMargin__blockButton">
                    <button onClick={() => onButtonClick(index)}>
                        Подробнее
                    </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
