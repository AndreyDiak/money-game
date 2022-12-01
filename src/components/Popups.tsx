import { Button, Menu, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPopupsShownThunk } from "../redux/game-reducer";
import { getStocksSelector } from "../redux/stocks-selector";
import { AppStateType } from "../redux/store";
import { MarginPayBackPopup } from "./game/market/Margin/MarginPayBackPopup";
import { MarginPopup } from "./game/market/Margin/MarginPopup";
import { RealtyPopup } from "./game/market/Realty/RealtyPopup";
import { Chart } from "./game/market/Stocks/Chart";
import { HistoryPopup } from "./game/market/Stocks/HistoryPopup";
import { SellPopup } from "./game/market/Stocks/SellPopup";
import { GameEndPopup } from "./GameEndPopup";

const Popups = React.memo(() => {

  const dispatch = useDispatch()
  const income = useSelector((state: AppStateType) => state.profilePage.income)
  const stocks = useSelector(getStocksSelector)
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  const popups = useSelector((state: AppStateType) => state.gamePage.popups)
  
  const onButtonClick = () => {
    dispatch(setPopupsShownThunk('market', false))
  }

  return (
    <>
      {popups.myStock.isShown && <SellPopup /> }
      {popups.stock.isShown && <Chart /> }
      {popups.broker.isShown && <MarginPopup /> }
      {popups.history.isShown && <HistoryPopup />  }
      {gameStatus !== 'process' && <GameEndPopup /> }
      {popups.margin.isShown && <MarginPayBackPopup /> }
      {/* @ts-ignore */}
      {(popups.realtyBuy === true || popups.realtySell === true) && <RealtyPopup/> }
      <Modal style={{width: '90%', textAlign: 'center'}} onCancel={onButtonClick} visible={popups.market.isShown} title={'Рынок'} footer={[
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
})

export default Popups