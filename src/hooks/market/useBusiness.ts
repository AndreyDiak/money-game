import { notification } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { businessActions } from "../../redux/game/business/business-reducer";
import { newsActions } from "../../redux/news/news-reducer";
import { getIncomeSelector } from "../../redux/profile/profile-selector";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import { getIsAbleToShowNotificationSelector } from "../../redux/game/business/business-selector";

export const useBusiness = () => {
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
