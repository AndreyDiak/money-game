import { notification } from "antd";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newsActions } from "../../redux/news-reducer";
import { stocksActions } from "../../redux/market/stocks/stocks-reducer";
import { getStocksSelector } from "../../redux/market/stocks/stocks-selector";
import { AppStateType } from "../../redux/store";

export const useStocks = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch()
  const incomeSelector = useCallback(
    (state: AppStateType) => state.profilePage.income,
    []
  );

  const stocks = useSelector(getStocksSelector)
  const income = useSelector(incomeSelector);

  const openNotification = (text: string) => {
    notification.open({
      message: 'Поздравляем',
      description: text,
    });
  }

  useEffect(() => {
    if (income >= 250 && stocks.length === 0) {
      console.log('rerender')
      // создаём акции
      dispatch(stocksActions.setStocks());
      dispatch(stocksActions.setBrokers());
      dispatch(stocksActions.setBonds());
      // новости про акции
      dispatch(newsActions.setAbleToShow("stocksNews"));
      openNotification("Рынок акций / облигаций открыт!");
    }
  }, []);

  return null;

};
