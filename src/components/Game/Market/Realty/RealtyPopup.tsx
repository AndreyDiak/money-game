import { CloseOutlined } from "@ant-design/icons"
import { FC } from "react"
import { useDispatch } from 'react-redux'
import { settingsActions } from "../../../../redux/settings-reducer"
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector"
type RealtyPopupType = {
  isRealtyToSell: boolean // окно для покупки или продажи? 
  setIsRealtyShown: (isRealtyShown: boolean) => void // закрытие окна...
}
export const RealtyPopup: FC<RealtyPopupType> = ({isRealtyToSell, setIsRealtyShown}) => {

  const dispatch = useDispatch()
  const myRealty = useTypedSelector(state => state.realtyPage.myRealty)

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
        </div>
      </div>
    </>
  )
}