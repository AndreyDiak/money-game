import { CloseOutlined } from "@ant-design/icons"
import React, { FC } from "react"
import { useDispatch } from 'react-redux'
import { setPopupsShownThunk } from "../../../../redux/game-reducer"
import { settingsActions } from "../../../../redux/settings-reducer"
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector"

export const RealtyPopup: FC = React.memo(() => {

  const dispatch = useDispatch()
  const myRealty = useTypedSelector(state => state.realtyPage.myRealty)

  const onCloseClick = () => {
    dispatch(setPopupsShownThunk('realty', false))
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
})