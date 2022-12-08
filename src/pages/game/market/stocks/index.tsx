import React, { FC } from "react";
import { StocksList } from "./StocksList/StocksList";

const StocksPage: FC = React.memo(() => {
  return (
    <div>
      <StocksList />
    </div>
  );
});

export default StocksPage;
