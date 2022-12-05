import { getIsAbleToGenerateBusinessSelector } from './../../redux/market/business/business-selector';
import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIncomeSelector } from "../../redux/game/game-selector";
import { businessActions } from "../../redux/market/business/business-reducer";
import { getBusinessesSelector } from "../../redux/market/business/business-selector";
import { newsActions } from "../../redux/news/news-reducer";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";

export const useRealty = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch();

  const isAbleToGenerate = useTypedSelector(getIsAbleToGenerateBusinessSelector);
  const income = useTypedSelector(getIncomeSelector);

  const openNotification = (text: string) => {
    notification.open({
      message: "Поздравляем",
      description: text,
    });
  };

  useEffect(() => {
    if (income >= 2500 && !isAbleToGenerate) {
      console.log('business')
      // новости про акции
      dispatch(newsActions.setAbleToShow("businessNews"));
      dispatch(businessActions.openBusiness());
      openNotification("Вам стала доступна покупка бизнеса!");
    }
  }, [isAbleToGenerate]);

  return null;
};
