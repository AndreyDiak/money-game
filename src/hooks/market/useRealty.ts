import { notification } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { realtyActions } from "../../redux/market/realty/realty-reducer";
import { newsActions } from "../../redux/news/news-reducer";
import { getIncomeSelector } from "../../redux/profile/profile-selector";
import { getIsAbleToShowNotificationSelector } from './../../redux/market/business/business-selector';
import { useTypedSelector } from "./../../utils/hooks/useTypedSelector";

export const useRealty = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch();
  
  const income = useTypedSelector(useCallback(getIncomeSelector, []));
  const isAbleToShowNotification = useTypedSelector(useCallback(getIsAbleToShowNotificationSelector, []));

  const openNotification = (text: string) => {
    notification.open({
      message: "Поздравляем",
      description: text,
    });
  };

  useEffect(() => {
    const generateRealty = () => {
      if (income >= 1250 && !isAbleToShowNotification) {
        // новости про акции
        dispatch(newsActions.setAbleToShow("realtyNews"));
        dispatch(realtyActions.openRealty());
        openNotification("Вам стала доступна покупка недвижимости!");
      }
      generateRealty();
    };
  }, []);

  return null;
};
