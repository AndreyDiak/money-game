import {RenderMyStock} from "./StockCard";
import React, {FC, SetStateAction} from "react";
import {myStockType} from "../../../../redux/stocks-reducer";
import {useSelector} from "react-redux";
import {getMyStocksSelector} from "../../../../redux/stocks-selector";

type MyStocksType = {
  setIsHistoryShown: any,
  setActiveStock: SetStateAction<any>
  setMyActiveStock: SetStateAction<any>
  setIsStockToSell: SetStateAction<any>
}

export const MyPortfolio: FC<MyStocksType> = ({
                                             setActiveStock,
                                             setMyActiveStock,
                                             setIsHistoryShown,
                                             setIsStockToSell}) => {

  const myStocks: myStockType[] = useSelector(getMyStocksSelector)

  return (
    <>
      <div className="gameProfitStocks__Me">
        <div className="gameProfitStocks__Header">
          Ваш портфель
        </div>
        <div className="gameProfitStocks__OfferBlocks">
          <div className="gameProfitStocks__OfferBlocks__stocks">
            {myStocks.map((stock, index) =>
              <RenderMyStock
                stock={stock}
                index={index}
                setIsHistoryShown={setIsHistoryShown}
                setActiveStock={setActiveStock}
                setMyActiveStock={setMyActiveStock}
                setIsStockToSell={setIsStockToSell}
              />
            )}

          </div>
        </div>
      </div>
    </>
  )
}