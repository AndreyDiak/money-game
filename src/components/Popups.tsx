import { Button, Menu, Modal } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getStocksSelector } from "../redux/stocks-selector";
import { AppStateType } from "../redux/store";
import { useTypedSelector } from "../utils/hooks/useTypedSelector";
import { MarginPayBackPopup } from "./Game/Market/Margin/MarginPayBackPopup";
import { MarginPopup } from "./Game/Market/Margin/MarginPopup";
import { Chart } from "./Game/Market/Stocks/Chart";
import { HistoryPopup } from "./Game/Market/Stocks/HistoryPopup";
import { SellPopup } from "./Game/Market/Stocks/SellPopup";
import { GameEndPopup } from "./GameEndPopup";

export const Popups = React.memo(() => {

  const income = useSelector((state: AppStateType) => state.profilePage.income)
  const stocks = useSelector(getStocksSelector)
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  const popups = useTypedSelector(state => state.gamePage.popups)
  
  const onButtonClick = () => {
    setIsMarketOpen(false)
  }

  return (
    <>
      {popups.myStock.isShown && <SellPopup stock={popups.myStock.active} setIsStockToSell={setIsStockToSell} activeStock={activeStock}/>}
      {isStockToBuy && <Chart setIsHistoryShown={setIsStockToBuy} stock={stock}/>}
      {isMarginShown && <MarginPopup setIsMarginShown={setIsMarginShown} broker={activeBroker} /> }
      {isHistoryShown && <HistoryPopup setIsHistoryShown={setIsHistoryShown} />}
      {gameStatus !== 'process' && <GameEndPopup setIsHistoryShown={setIsHistoryShown}/> }
      {isMarginPayBackShown && 
      <MarginPayBackPopup 
        setIsMarginPayBackShown={setIsMarginPayBackShown}
      /> 
      }
      <Modal style={{width: '90%', textAlign: 'center'}} onCancel={onButtonClick} visible={isMarketOpen} title={'Рынок'} footer={[
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