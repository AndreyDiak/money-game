import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Stocks } from "../../../../components/game/market/stocks/Stocks";
import { setPopupsShownThunk } from "../../../../redux/game/game-reducer";
import { popups } from "../../../../redux/game/models";
import { settingsActions } from "../../../../redux/settings/settings-reducer";
import { useTypedSelector } from "../../../../utils/hooks/useTypedSelector";


const StocksList: FC = React.memo(() => {
  return (
    <div>
      <Stocks />
    </div>
  );
});

export default StocksList;
