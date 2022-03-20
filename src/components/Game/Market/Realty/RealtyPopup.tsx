import { CloseOutlined } from "@ant-design/icons"
import { FC } from "react"
import { useDispatch } from 'react-redux'
import { settingsActions } from "../../../../redux/settings-reducer"
type RealtyPopupType = {
  isRealtyToSell: boolean // окно для покупки или продажи? 
  setIsRealtyShown: (isRealtyShown: boolean) => void // закрытие окна...
}
export const RealtyPopup: FC<RealtyPopupType> = ({isRealtyToSell, setIsRealtyShown}) => {

  const dispatch = useDispatch()

  const onCloseClick = () => {
    setIsRealtyShown(false)
    dispatch(settingsActions.setTimeSpeed())
  }

  return (
    <>
      <div className="realtyPopup">
        <div className="realtyPopupBlock">
          <div className="realtyPopupBlock__Close">
            <CloseOutlined onClick={onCloseClick} />
          </div>
          {/* 
            в зависимости от того, покупаем или продаем мы недвижиомость, мы будем выводить, список нашей недвижимости...
            окошко в котором будет отображатся недвижимость, если мы хотим ее купить или продать...
          */}
        </div>
      </div>
    </>
  )
}