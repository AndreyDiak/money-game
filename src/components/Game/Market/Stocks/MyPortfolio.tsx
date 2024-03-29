import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getMyStocksSelector } from "../../../../redux/market/stocks/stocks-selector";
import { myStockType } from "../../../../redux/market/stocks/typings";
import { RenderMyStock } from "./StockCard";

export const MyPortfolio: FC = React.memo(() => {

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
            myStock={stock}
            index={index}
          />
        )}
      </div>
    </div>
  </div>
  </>
  )
})