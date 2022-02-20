import {SellPopup} from "./Game/Market/Stocks/SellPopup";
import {Chart} from "./Game/Market/Stocks/Chart";
import {brokerType, myStockType, stockType} from "../redux/stocks-reducer";
import React, {FC, SetStateAction} from "react";
import {Button, Menu, Modal} from "antd";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {getStocksSelector} from "../redux/stocks-selector";
import {MarginPopup} from "./Game/Market/Margin/MarginPopup";

export type PopupsType = {
  myStock: myStockType
  activeBroker: brokerType
  setIsStockToSell: SetStateAction<any>
  activeStock: number
  setIsHistoryShown: SetStateAction<any>
  setIsMarketOpen: SetStateAction<any>
  setActiveStock: (activeStock: stockType) => void
  setIsMarginShown: (isMarginShown: boolean) => void
  stock: stockType
  isHistoryShown: boolean
  isStockToSell: boolean
  showExitModal: boolean
  isMarketOpen: boolean
  isMarginShown: boolean
}

export const Popups:FC<PopupsType> = (props) => {

  const income = useSelector((state: AppStateType) => state.profilePage.income)
  const stocks = useSelector(getStocksSelector)

  return (
    <>
      {props.isStockToSell && <SellPopup stock={props.myStock} setIsStockToSell={props.setIsStockToSell} activeStock={props.activeStock}/>}
      {props.isHistoryShown && <Chart setIsHistoryShown={props.setIsHistoryShown} stock={props.stock}/>}
      {props.isMarginShown && 
      <MarginPopup 
        setIsMarginShown={props.setIsMarginShown} 
        broker={props.activeBroker} 
        setIsHistotyShown={props.setIsHistoryShown} 
        setActiveStock={props.setActiveStock}
        /> 
      }
      
      <Modal style={{width: '90%', textAlign: 'center'}} onCancel={() => props.setIsMarketOpen(false)} visible={props.isMarketOpen} title={'Рынок'} footer={[
        <>
        </>
      ]}>
        <Menu style={{padding: '10px'}}>
          {income < 250 && stocks.length === 0
            ? <p>
              Доход более $250 / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/stocks'>
                <Button onClick={() => props.setIsMarketOpen(false)}>Акции</Button>
              </NavLink>
            </Menu.Item>
          }
          {income < 1000
            ? <p>
              Доход более <b>$1000</b> / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/realty'>
                <Button onClick={() => props.setIsMarketOpen(false)}>Недвижимость</Button>
              </NavLink>
            </Menu.Item>
          }
          {income < 3000
            ? <p>
              Доход более <b>$3000</b> / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/business'>
                <Button onClick={() => props.setIsMarketOpen(false)}>Бизнес</Button>
              </NavLink>
            </Menu.Item>
          }
        </Menu>
      </Modal>
    </>
  )
}