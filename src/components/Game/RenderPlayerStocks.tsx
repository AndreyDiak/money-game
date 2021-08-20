import {RenderMyStock, RenderStock} from "./RenderStock";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import { getMyStocksSelector, getStocksSelector } from "../../redux/stocks-selector";


export type RenderPlayerStocksType = {
  setIsHistoryShown: any
  setActiveStock: any
  setMyActiveStock: any
  setIsStockToSell: any
}

export const RenderPlayerStocks: FC<RenderPlayerStocksType> = (props) => {

  const myStocks = useSelector(getMyStocksSelector)
  const stocks = useSelector(getStocksSelector)

  return (
    <>
      <div className="gameProfit bannerBack">
        <div className="gameProfitStocks">
          <div className="gameProfitStocks__Me">
            <div className="gameProfitStocks__Header">
              Ваши акции
            </div>
            <div className="gameProfitStocks__OfferBlocks">
              {myStocks.map((stock, index) =>
                <RenderMyStock
                  stock={stock}
                  index={index}
                  setIsHistoryShown={props.setIsHistoryShown}
                  setActiveStock={props.setActiveStock}
                  setMyActiveStock={props.setMyActiveStock}
                  setIsStockToSell={props.setIsStockToSell}
                />
              )}
            </div>
          </div>
          <div className="gameProfitStocks__Offer">
            <div className="gameProfitStocks__Header">
              Акции на рынке
            </div>
            <div className="gameProfitStocks__OfferBlocks">
              {stocks.map((stock, index) =>
                <RenderStock
                  stock={stock}
                  index={index}
                  setIsHistoryShown={props.setIsHistoryShown}
                  setActiveStock={props.setActiveStock}
                />
              )}
            </div>
          </div>
        </div>
        <div className="gameProfitStocks__Menu">
          <div className="gameProfitStocks__MenuButtons">
            <button className="gameProfitStocks__MenuButton">
              Купить акции
            </button>
            <button className="gameProfitStocks__MenuButton">
              Продать акции
            </button>
          </div>
        </div>
      </div>
    </>
  )
}