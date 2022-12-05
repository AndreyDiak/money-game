import { getIsAbleToShowNotificationSelector } from "./../../redux/market/business/business-selector";
import { notification } from "antd";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { businessActions } from "../../redux/market/business/business-reducer";
import { getBusinessesSelector } from "../../redux/market/business/business-selector";
import { newsActions } from "../../redux/news/news-reducer";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import { getIncomeSelector } from "../../redux/profile/profile-selector";

export const useRealty = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch();

  const income = useTypedSelector(useCallback(getIncomeSelector, []));
  const isAbleToShowNotification = useTypedSelector(
    useCallback(getIsAbleToShowNotificationSelector, [])
  );

  const openNotification = (text: string) => {
    notification.open({
      message: "Поздравляем",
      description: text,
    });
  };

  useEffect(() => {
    const generateBusiness = () => {
      if (income >= 2500 && !isAbleToShowNotification) {
        // новости про акции
        dispatch(newsActions.setAbleToShow("businessNews"));
        dispatch(businessActions.openBusiness());
        openNotification("Вам стала доступна покупка бизнеса!");
      }
    };
    generateBusiness();
  }, []);

  return null;
};
