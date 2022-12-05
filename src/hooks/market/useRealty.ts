import { useTypedSelector } from './../../utils/hooks/useTypedSelector';
import { notification } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { realtyActions } from "../../redux/market/realty/realty-reducer";
import { getIsAbleToGenerateRealtySelector } from "../../redux/market/realty/realty-selector";
import { newsActions } from "../../redux/news/news-reducer";
import { AppStateType } from "../../redux/store";

export const useRealty = () => {
  // доход в месяц игрока . . .

  const dispatch = useDispatch();
  const incomeSelector = useCallback(
    (state: AppStateType) => state.profilePage.income,
    []
  );

  const income = useTypedSelector(incomeSelector);
  const isAbleToGenerate = useTypedSelector(getIsAbleToGenerateRealtySelector);

  const openNotification = (text: string) => {
    notification.open({
      message: "Поздравляем",
      description: text,
    });
  };

  useEffect(() => {
    if (income >= 1250 && !isAbleToGenerate) {
      console.log('realty')
      // новости про акции
      dispatch(newsActions.setAbleToShow("realtyNews"));
      dispatch(realtyActions.openRealty());
      openNotification("Вам стала доступна покупка недвижимости!");
    }
  }, [isAbleToGenerate]);

  return null;
};
