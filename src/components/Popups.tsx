import { Button, Menu, Modal } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { brokerType, myStockType, stockType } from "../redux/stocks-reducer";
import { getStocksSelector } from "../redux/stocks-selector";
import { AppStateType } from "../redux/store";
import { MarginPayBackPopup } from "./Game/Market/Margin/MarginPayBackPopup";
import { MarginPopup } from "./Game/Market/Margin/MarginPopup";
import { Chart } from "./Game/Market/Stocks/Chart";
import { SellPopup } from "./Game/Market/Stocks/SellPopup";

export type PopupsType = {
  myStock: myStockType
  activeBroker: brokerType
  activeStock: number
  stock: stockType
  isHistoryShown: boolean
  isStockToSell: boolean
  showExitModal: boolean
  isMarketOpen: boolean
  isMarginShown: boolean
  isMarginPayBackShown: boolean
  setIsMarginPayBackShown: (isMarginPayBackShown: boolean) => void
  setIsStockToSell: (isStockToSell: boolean) => void
  setIsHistoryShown: (isHistoryShown: boolean) => void
  setIsMarketOpen: (isMarketOpen: boolean) => void
  setActiveStock: (activeStock: stockType) => void
  setIsMarginShown: (isMarginShown: boolean) => void
}

export const Popups:FC<PopupsType> = (props) => {

  const income = useSelector((state: AppStateType) => state.profilePage.income)
  const stocks = useSelector(getStocksSelector)
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  
  const onButtonClick = () => {
    props.setIsMarketOpen(false)
  }

  return (
    <>
      {props.isStockToSell && <SellPopup stock={props.myStock} setIsStockToSell={props.setIsStockToSell} activeStock={props.activeStock}/>}
      {props.isHistoryShown && <Chart setIsHistoryShown={props.setIsHistoryShown} stock={props.stock}/>}
      {props.isMarginShown && <MarginPopup setIsMarginShown={props.setIsMarginShown} broker={props.activeBroker} /> }
      {props.isMarginPayBackShown && 
      <MarginPayBackPopup 
        setIsMarginPayBackShown={props.setIsMarginPayBackShown}
      /> 
      }
      <Modal style={{width: '90%', textAlign: 'center'}} onCancel={onButtonClick} visible={props.isMarketOpen} title={'Рынок'} footer={[
        <>
        </>
      ]}>
        <Menu style={{padding: '10px'}}>
          {income < 250 && stocks.length === 0
            ? <p>
              Доход более $250 / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market'>
                <Button onClick={onButtonClick}>Акции</Button>
              </NavLink>
            </Menu.Item>
          }
          {income < 1000
            ? <p>
              Доход более <b>$1000</b> / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/realty'>
                <Button onClick={onButtonClick}>Недвижимость</Button>
              </NavLink>
            </Menu.Item>
          }
          {income < 3000
            ? <p>
              Доход более <b>$3000</b> / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/business'>
                <Button onClick={onButtonClick}>Бизнес</Button>
              </NavLink>
            </Menu.Item>
          }
        </Menu>
      </Modal>
    </>
  )
}