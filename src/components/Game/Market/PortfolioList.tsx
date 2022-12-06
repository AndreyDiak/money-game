import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { getMyStocksSelector } from "../../../redux/market/stocks-selector";
import { myStockType } from "../../../redux/market/typings";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import { RenderMyStock } from "./stocks/StockCard";

export const PortfolioList: FC = React.memo(() => {

  const myStocks: myStockType[] = useTypedSelector(useCallback(getMyStocksSelector, []));

  return (
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
  )
})