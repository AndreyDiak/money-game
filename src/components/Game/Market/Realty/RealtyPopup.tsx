import { CloseOutlined } from "@ant-design/icons"
import { Slider } from "antd"
import React, { FC, useState } from "react"
import { useDispatch } from 'react-redux'
import { setPopupsShownThunk } from "../../../../redux/game-reducer"
import { myRealtyType } from "../../../../redux/realty-reducer"
import { settingsActions } from "../../../../redux/settings-reducer"
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector"

export const RealtyPopup: FC = React.memo(() => {

  const dispatch = useDispatch()
  const myRealty = useTypedSelector(state => state.realtyPage.myRealty)
  const popups = useTypedSelector(state => state.gamePage.popups)
  const isRealtyBuy = popups.realtyBuy.isShown // покупка или продажа...
  // блок с активной недвижимостью...
  const [activeRealty, setActiveRealty] = useState(popups.realtyBuy.active)
  // цена недвижимости...
  const [realtyPrice, setRealtyPrice] = useState(activeRealty.price)
  
  const onCloseClick = () => {
    dispatch( setPopupsShownThunk(isRealtyBuy ? 'realtyBuy' : 'realtySell', false) )
    dispatch( settingsActions.setTimeSpeed() )
  }
  
  const onPriceChange = (e: any) => {
    
  }

  const onBuyRealtyClick = () => {

  }

  const onSellRealtyClick = () => {

  }
   
  return (
    <>
      <div className="realtyPopup">
        <div className="realtyPopupBlock">
          <div className="realtyPopupBlock__Close">
            <CloseOutlined onClick={onCloseClick} />
          </div>
          <div className="realtyPopupBlock__Realty">
            {/* блок для отображения текущей недвижимости... */}
            <div className="realtyPopupBlock__RealtyActive">
              <div className="realtyPopupBlock__RealtyActive__Img">{activeRealty.photo}</div>
              <div className="realtyPopupBlock__RealtyActive__About">
                <div className="realtyPopupBlock__RealtyActive__AboutTitle">{activeRealty.title}</div>
                <div className="realtyPopupBlock__RealtyActive__AboutPrice">{activeRealty.price}</div>
                <div className="realtyPopupBlock__RealtyActive__AboutRegion">{activeRealty.region}</div>
                <div className="realtyPopupBlock__RealtyActive__AboutDemand">{activeRealty.demand}</div>
              </div>
            </div>
            <div className="realtyPopupBlock__RealtyMenu">
              <Slider min={0} defaultValue={1} value={1} max={2} onChange={onPriceChange}/>
            </div>
            {
              !isRealtyBuy &&
              <div className="realtyPopupBlock__RealtyList">
                {myRealty.map((realty, index) => {
                  return <MyRealtyBlock key={index} realty={realty} setActiveRealty={setActiveRealty} />
                })}
              </div>
            }
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

const MyRealtyBlock: FC<{realty: myRealtyType, setActiveRealty: (active: any) => void}> = ({realty, setActiveRealty}) => {
  return (
    <div className="realtyPopupBlock__RealtyList__Block">
      <div className="realtyPopupBlock__RealtyList__BlockImg">
        <img src={realty.photo} alt="" />
      </div>
      <div className="realtyPopupBlock__RealtyList__BlockAbout">
        <div className="realtyPopupBlock__RealtyList__BlockAbout__Title">{realty.title}</div>
        <div className="realtyPopupBlock__RealtyList__BlockAbout__Region">{realty.region}</div>
        <div className="realtyPopupBlock__RealtyList__BlockAbout__Price">{realty.price}</div>
      </div>
    </div>
  )
}