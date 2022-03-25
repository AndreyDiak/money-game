import { CloseOutlined } from "@ant-design/icons"
import { Slider } from "antd"
import React, { FC, useCallback, useRef, useState } from "react"
import { useDispatch } from 'react-redux'
import { setPopupsShownThunk } from "../../../../redux/game-reducer"
import { ChanceType, myRealtyType } from "../../../../redux/realty-reducer"
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
  /*
    надо разработать точный алгоритм продажи и покупки недвижимости...
    прописать точную реализацию зависимости от региона и спроса на недвижимость...
  */
  const calculatePriceChange = ( price: number, region: ChanceType ) => {
    return region === 'high' ? price * 0.4 : region === 'medium' ? price * 0.2 : price * 0.1
  }
  const calculateAttemptChance = ( dealPrice: number, startPrice: number, demand: ChanceType ) => {
    let demandChance = demand === 'high' ? 0.7 : demand === 'medium' ? 0.5 : 0.3
    let change = Math.abs( startPrice - dealPrice ) / startPrice // изменение цены...
    return change < demandChance
  }
  // 
  const [realtyChangePrice, setRealtyChangePrice] = useState(
    calculatePriceChange( activeRealty.price, activeRealty.region )
    )
  //
  
  const onCloseClick = () => {
    dispatch( setPopupsShownThunk(isRealtyBuy ? 'realtyBuy' : 'realtySell', false) )
    dispatch( settingsActions.setTimeSpeed() )
  }
  
  const onChangeHandler = (e: any) => {
    onPriceChange(e.target.value)
  }

  const useDebounce = (callback: any, delay: number) => {
    const timer = useRef(0)

    const debouncedCallback = useCallback((...args) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      // @ts-ignore
      timer.current = setTimeout(() => {
        callback(...args)
      }, delay)
    }, [callback, delay])
    
    return debouncedCallback
  }
  // hello world
  const onPriceChange = useDebounce((value: number) => {
    // выполняем новый просчет коэффициента 
  }, 500)
  

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
            {
              activeRealty.title &&
              <div className="realtyPopupBlock__RealtyMenu">
                <Slider 
                  min={realtyPrice - realtyChangePrice} 
                  defaultValue={realtyPrice} 
                  value={realtyPrice} 
                  max={realtyPrice + realtyChangePrice} 
                  onChange={onChangeHandler}
                />
              </div>
            }
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