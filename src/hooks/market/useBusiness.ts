import { businessActions } from './../../redux/business-reducer';
// if (income >= 1000 && businesses.length === 0) {
//   openNotification('Рынок недвижимости открыт!')
// }

import { notification } from "antd";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessesSelector } from "../../redux/business-selector";
import { newsActions } from "../../redux/news-reducer";
import { stocksActions } from "../../redux/market/stocks/stocks-reducer";
import { getStocksSelector } from "../../redux/market/stocks/stocks-selector";
import { AppStateType } from "../../redux/store";
import BusinessPage from "../../pages/game/market/business";

export const useRealty = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch()
  const incomeSelector = useCallback(
    (state: AppStateType) => state.profilePage.income,
    []
  );

  const business = useSelector(getBusinessesSelector)
  const income = useSelector(incomeSelector);

  const openNotification = (text: string) => {
    notification.open({
      message: 'Поздравляем',
      description: text,
    });
  }

  useEffect(() => {
    if (income >= 2500 && business.length === 0) {
      // новости про акции
      dispatch(newsActions.setAbleToShow('businessNews'));
      dispatch(businessActions.openBusiness());
      openNotification("Вам стала доступна покупка бизнеса!");
    }
  }, []);

  return null;

};
