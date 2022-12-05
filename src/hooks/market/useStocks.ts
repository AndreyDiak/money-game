import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { stocksActions } from "../../redux/market/stocks/stocks-reducer";
import { getStocksSelector } from "../../redux/market/stocks/stocks-selector";
import { newsActions } from "../../redux/news/news-reducer";
import { getIncomeSelector } from "../../redux/profile/profile-selector";
import { useTypedSelector } from './../../utils/hooks/useTypedSelector';

export const useStocks = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch()

  const stocks = useTypedSelector(getStocksSelector)
  const income = useTypedSelector(getIncomeSelector);

  const openNotification = (text: string) => {
    notification.open({
      message: 'Поздравляем',
      description: text,
    });
  }

  useEffect(() => {
    const generateStocks = () => {
      console.log(income);
      if (income >= 250 && stocks.length === 0) {
        console.log('тук')
        // создаём акции
        dispatch(stocksActions.setStocks());
        dispatch(stocksActions.setBrokers());
        dispatch(stocksActions.setBonds());
        // новости про акции
        dispatch(newsActions.setAbleToShow("stocksNews"));
        openNotification("Рынок акций / облигаций открыт!");
      }
    }
    generateStocks()
  }, []);

  return null;

};
