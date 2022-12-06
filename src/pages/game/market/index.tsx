import { Button } from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import MarketMenu from "../../../components/game/market/MarketMenu";
import { setPopupsShownThunk } from "../../../redux/game/game-reducer";
import { popups } from "../../../redux/game/models";
import { settingsActions } from "../../../redux/settings/settings-reducer";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import { MarketRoutes } from "./_routes";

const MarketPage: FC = React.memo(() => {
  const dispatch = useDispatch();
  const [marketActiveFilter, setMarketActiveFilter] = useState(1);
  const margin = useTypedSelector((state) => state.stocksPage.margin);
  // разрешение экрана...
  
  const onMarginClick = () => {
    dispatch(settingsActions.setTimeSpeed(0));
    dispatch(setPopupsShownThunk(popups.MARGIN, true));
  };
  const onHistoryClick = () => {
    dispatch(settingsActions.setTimeSpeed(0));
    dispatch(setPopupsShownThunk(popups.HISTORY, true));
  };
  return (
    <>
      <div className="gameProfit bannerBack">
        <div className="gameProfitStocks">
          <div className="container">
            <div className="gameProfitMenu">
              <div className="gameProfitMenu__History">
                <Button onClick={onHistoryClick}>История</Button>
              </div>
              <MarketMenu />
            </div>
            <div className="gameProfitDanger">
              {margin.length > 0 && (
                <Button onClick={onMarginClick}>Закрыть позицию</Button>
              )}
            </div>
            {/* TODO сделать здесь роуты с листами на акции бонды и маржу... */}
            <MarketRoutes />
          </div>
        </div>
      </div>
    </>
  );
});

export default MarketPage;
