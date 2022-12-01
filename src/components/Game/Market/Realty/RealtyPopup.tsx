import { CloseOutlined } from "@ant-design/icons"
import { Button, Slider } from "antd"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { setPopupsShownThunk } from "../../../../redux/game/game-reducer"
import { activeRealtyType, ChanceType, myRealtyType } from "../../../../redux/market/realty/typings"
import { settingsActions } from "../../../../redux/settings-reducer"
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector"

export const RealtyPopup: FC = React.memo(() => {

  const dispatch = useDispatch()
  const myRealty = useTypedSelector(state => state.realtyPage.myRealty)
  const popups = useTypedSelector(state => state.gamePage.popups)
  const isRealtyToBuy = popups.realtyBuy.isShown // покупка или продажа...
  // расчет максимального различия цена от стартового значения...
  const calculatePriceChange = ( price: number, region: ChanceType ) => 
    region === 'high' ? price * 0.6 : region === 'medium' ? price * 0.4 : price * 0.2

  // блок с активной недвижимостью...
  const [activeRealty, setActiveRealty] = useState<activeRealtyType | myRealtyType>({} as activeRealtyType | (myRealtyType & {wanted: Number}))
  // цена недвижимости...
  const [realtyPrice] = useState(activeRealty.price)
 
  const [realtyChangePrice] = useState( !!activeRealty ?
    calculatePriceChange( activeRealty.price, activeRealty.region ) : null
    )
  //
    
  // const calculateAttemptChance = ( dealPrice: number, startPrice: number, demand: ChanceType ) => {
  //   // let demandChance = demand === 'high' ? 0.7 : demand === 'medium' ? 0.5 : 0.3
  //   // let change = Math.abs( startPrice - dealPrice ) / startPrice // изменение цены...
  //   // return change < demandChance
  // }
  // 

  const onCloseClick = () => {
    dispatch( setPopupsShownThunk(isRealtyToBuy ? 'realtyBuy' : 'realtySell', false) )
    dispatch( settingsActions.setTimeSpeed() )
  }
  
  const onChangeHandler = (e: any) => {
    onPriceChange(e.target.value)
  }

  const useDebounce = (callback: any, delay: number) => {

    const debouncedCallback = useCallback((...args) => {
      const timer = setTimeout(() => {
        callback(...args)
      }, delay)

      if (timer) {
        clearTimeout(timer)
      }
    }, [callback, delay])
    
    return debouncedCallback
  }
  // hello world
  const onPriceChange = useDebounce((value: number) => {
    // @ts-ignore
    // let satisfaction = activeRealty.satisfaction
    // @ts-ignore 
    // let wanted = isRealtyToBuy ? activeRealty.price : activeRealty.wanted
  }, 500)
  // если мы покупаем недвижку, то мы сетаем ее из активных попапов...
  useEffect(() => {
    if ( isRealtyToBuy ) setActiveRealty(popups.realtyBuy.active)
  },[isRealtyToBuy, popups.realtyBuy.active])

  const onBuyRealtyClick = () => {
    
  }

  const onSellRealtyClick = () => {
    
  }
  console.log(activeRealty)
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
            {
              !!activeRealty &&
              <div className="realtyPopupBlock__RealtyMenu">
                <div className="realtyPopupBlock__RealtyChance">
                  Шанс удачной сделки: {}
                </div>
                <Slider 
                  // @ts-ignore
                  min={realtyPrice - realtyChangePrice} 
                  defaultValue={realtyPrice} 
                  value={realtyPrice} 
                  // @ts-ignore
                  max={realtyPrice + realtyChangePrice} 
                  onChange={onChangeHandler}
                />
                <div className="realtyPopupBlock__RealtyMenu__Button">
                  { isRealtyToBuy 
                    ? <Button onClick={onBuyRealtyClick}>Купить</Button> 
                    : <Button onClick={onSellRealtyClick}>Продать</Button> 
                  }
                </div>
              </div>
            }
            {
              !isRealtyToBuy &&
              <div className="realtyPopupBlock__RealtyList">
                {myRealty.map((realty, index) => <MyRealtyBlock key={index} realty={realty} setActiveRealty={() => setActiveRealty({...realty, ...popups.realtySell.active})} />)}
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
      <div className="realtyPopupBlock__RealtyList__BlockButton">
        <Button onClick={setActiveRealty}>
          Выбрать
        </Button>
      </div>
    </div>
  )
}