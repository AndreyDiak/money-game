import { CloseOutlined } from "@ant-design/icons";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, setPopupsShownThunk } from "../../../../redux/game/game-reducer";
import { getWalletSelector } from "../../../../redux/game/game-selector";
import { popups } from "../../../../redux/game/models";
import { addStocksToPortfolioThunk, stocksActions } from "../../../../redux/market/stocks-reducer";
import { settingsActions } from "../../../../redux/settings/settings-reducer";
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector";
import { ChartGraph } from "./ChartGraph/ChartGraph";
import { ChartMenu } from "./ChartMenu/ChartMenu";

export const Chart: FC = React.memo(() => {

  const dispatch = useDispatch()
  const wallet = useSelector(getWalletSelector)
  const stock = useTypedSelector(state => state.gamePage.popups.stock.active)
  // массив с акциями . . .

  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(stock.price[stock.price.length - 1])
  const [isAbleToBuy, setIsAbleToBuy] = useState(
    !(stocksToBuyPrice <= wallet)
    || stock.count <= 0
    || stocksToBuyCount < 1
    || stocksToBuyCount > stock.count
  )
  const buyStocks = () => {
    dispatch(actions.setWallet(Math.round(wallet - stocksToBuyPrice)));
    updateStocksCount();
    dispatch(addStocksToPortfolioThunk(stock, stocksToBuyCount));
    setStocksToBuyCount(0);
    setStocksToBuyPrice(0);
    onCloseClick();
  }

  const updateStocksCount = () => {
    // обновляем данные по количеству акций . . .
    dispatch(stocksActions.updateStocks(stock.title, stocksToBuyCount))
  }

  const setStocksCount = (count: number) => {
    if (count <= 0) {
      setStocksToBuyCount(1)
      setStocksToBuyPrice(stock.price[stock.price.length - 1])
      return
    }
    if (count > stock.count) {
      setStocksCount(stock.count)
      setStocksToBuyPrice(stock.count * stock.price[stock.price.length - 1])
      return
    }
    setStocksToBuyCount(count)
    setStocksToBuyPrice(count * stock.price[stock.price.length - 1])
  }
  // закрытие окна...
  const onCloseClick = () => {
    dispatch(setPopupsShownThunk(popups.STOCK, false))
    // setIsHistoryShown(false)
    dispatch(settingsActions.setTimeSpeed())
  }
  // проверка возможности покупки акций...
  useEffect(() => {
    setIsAbleToBuy(
      !(stocksToBuyPrice <= wallet)
      || stock.count <= 0
      || stocksToBuyCount < 1
      || stocksToBuyCount > stock.count
    )
  }, [stock.count, stocksToBuyCount, stocksToBuyPrice, wallet])

  return (
    <>
      <div className="chartPopup">
        <div className="chartPopupBlock">
          <div className="chartPopupBlock__Close" onClick={onCloseClick}>
            <CloseOutlined />
          </div>
          <div className="chartPopupBlock__Title">
            <div>График с ценой на акции компании:</div>
            <b>{stock.title}</b>
          </div>
          <ChartGraph stock={stock} />
          <ChartMenu
            stock={stock}
            stocksToBuyCount={stocksToBuyCount}
            stocksToBuyPrice={stocksToBuyPrice}
            isAbleToBuy={isAbleToBuy}
            buyStocks={buyStocks}
            setStocksCount={setStocksCount}
          />
        </div>
      </div>
    </>
  )
}
)



