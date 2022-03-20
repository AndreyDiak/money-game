import { Button, Menu, Modal } from "antd";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPopupsShownThunk } from "../redux/game-reducer";
import { getStocksSelector } from "../redux/stocks-selector";
import { AppStateType } from "../redux/store";
import { useTypedSelector } from "../utils/hooks/useTypedSelector";
import { MarginPayBackPopup } from "./Game/Market/Margin/MarginPayBackPopup";
import { MarginPopup } from "./Game/Market/Margin/MarginPopup";
import { Chart } from "./Game/Market/Stocks/Chart";
import { HistoryPopup } from "./Game/Market/Stocks/HistoryPopup";
import { SellPopup } from "./Game/Market/Stocks/SellPopup";
import { GameEndPopup } from "./GameEndPopup";

export const Popups:FC = React.memo(({}) => {

  const dispatch = useDispatch()

  const income = useSelector((state: AppStateType) => state.profilePage.income)
  const stocks = useSelector(getStocksSelector)
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  const popups = useTypedSelector(state => state.gamePage.popups)

  const onCloseClick = () => {
    dispatch(setPopupsShownThunk('market', false))
    // setIsMarketOpen(false)
  }

  return (
    <>
      {popups.stock.isShown &&  <Chart /> }
      {popups.myStock.isShown && <SellPopup />}  
      {popups.broker.isShown && <MarginPopup /> }
      {popups.history.isShown && <HistoryPopup /> }
      {gameStatus !== 'process' && <GameEndPopup /> }
      {popups.margin.isShown && <MarginPayBackPopup/> }
      <Modal style={{width: '90%', textAlign: 'center'}} onCancel={onCloseClick} visible={popups.market.isShown} title={'Рынок'} footer={[
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
                <Button onClick={onCloseClick}>Акции</Button>
              </NavLink>
            </Menu.Item>
          }
          {income < 1000
            ? <p>
              Доход более <b>$1000</b> / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/realty'>
                <Button onClick={onCloseClick}>Недвижимость</Button>
              </NavLink>
            </Menu.Item>
          }
          {income < 3000
            ? <p>
              Доход более <b>$3000</b> / мес
            </p>
            : <Menu.Item>
              <NavLink to='/game/market/business'>
                <Button onClick={onCloseClick}>Бизнес</Button>
              </NavLink>
            </Menu.Item>
          }
        </Menu>
      </Modal>
    </>
  )
})