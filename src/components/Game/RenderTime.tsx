import { Breadcrumb } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { getMyBusinessesSelector } from "../../redux/business-selector";
import { actions } from "../../redux/game-reducer";
import { getDayInMonthSelector, getDaySelector, getMonthSelector, getMonthsSelector } from "../../redux/game-selector";
import { setNewsThunk } from "../../redux/news-reducer";
import { profileActions, updateIncome } from "../../redux/profile-reducer";
import { realtyActions } from "../../redux/realty-reducer";
import { spendsActions, weekSpendThunk } from "../../redux/spends-reducer";
import { stocksActions } from "../../redux/stocks-reducer";
import { getStocksSelector } from "../../redux/stocks-selector";
import { AppStateType } from "../../redux/store";
import { getRandomNumber } from "../../utils/getRandomNumber";

type RenderTimeType = {
  wallet: number
}

export const RenderTime: FC<RenderTimeType> = (props) => {

  const newsTypeArray = useSelector((state: AppStateType) => state.newsPage.newsTypes)
  
  const companies = useSelector((state: AppStateType) => state.stocksPage.companiesForStocks)
  // день месяца . . .
  const dayInMonth = useSelector(getDayInMonthSelector)
  //
  const {request, isLoading, error} = useHttp()
  //
  const token = useSelector((state: AppStateType) => state.app.token)
  //
  const dispatch = useDispatch()
  // текущий день . . .
  const day = useSelector(getDaySelector)
  // акции
  const stocks = useSelector(getStocksSelector)
  // текущий месяц . . .
  const month = useSelector(getMonthSelector)
  // массив с месяцами . . .
  const months = useSelector(getMonthsSelector)
  // массив ваших бизнессов . . .
  const myBusinesses = useSelector(getMyBusinessesSelector)
  // текущая работа . . .
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  //
  const spendsLevel = useSelector((state: AppStateType) => state.spendsPage.spendsLevel)

  const income = useSelector((state: AppStateType) => state.profilePage.income)
  // const expenses = useSelector(getExpensesSelector)
  // подоходный налог на зп
  // const tax = useSelector(getTaxSelector)
  // массив с днями . . .
  const Days = [
    'Воскресенье', 'Понедельник', 'Вторник',
    'Среда', 'Четверг',
    'Пятница', 'Суббота'
  ]
  // находим день недели . . .
  const activeDay = Days[day % 7]
  // месяц . . .
  const activeMonth = month === 2 || month === 7
    ? months[month].name + 'a'
    : months[month].name.replace('ь','я')

  // TODO return back...
  // const saveGame = async (data: any) => {
  //   try {
  //     const fetchedData = await request('/api/game/save', 'POST', {data}, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     // message.success('Игра успешно сохранена')
  //   } catch (e) {
  //     message.error('Не удалось сохранить игру, ' + e)
  //   }

  //   // @ts-ignore
  // }

  // const dataForSave = {
  //   myBusinesses: myBusinesses,
  //   myRealty: useSelector((state: AppStateType) => state.realtyPage.myRealty),
  //   stocks: stocks,
  //   myStocks: useSelector(getMyStocksSelector),
  //   workedDays: useSelector((state: AppStateType) => state.worksPage.workedDays),
  //   daysToUp: useSelector((state: AppStateType) => state.worksPage.daysToUp),
  //   workLevel: useSelector((state: AppStateType) => state.worksPage.workLevel),
  //   workIncome: useSelector((state: AppStateType) => state.worksPage.workIncome),
  //   news: useSelector((state: AppStateType) => state.newsPage.news),
  //   newsIncome: useSelector((state: AppStateType) => state.newsPage.newsIncome),
  //   newsExpenses: useSelector((state: AppStateType) => state.newsPage.newsExpenses),
  //   startSalary: useSelector((state: AppStateType) => state.profilePage.startSalary),
  //   income: income,
  //   children: useSelector((state: AppStateType) => state.profilePage.children),
  //   childrenCount: useSelector((state: AppStateType) => state.profilePage.childrenCount),
  //   day: day,
  //   level: 0,
  //   dayInMonth: dayInMonth,
  //   month: month,
  //   wallet: useSelector((state: AppStateType) => state.gamePage.wallet),
  //   victoryBalance: useSelector((state: AppStateType) => state.gamePage.victoryBalance),

  //   spendsLevel: useSelector((state: AppStateType) => state.spendsPage.spendsLevel),
  //   events: useSelector((state: AppStateType) => state.spendsPage.events),
  //   currentMonthEvents: useSelector((state: AppStateType) => state.spendsPage.currentMonthEvents),
  //   currentMonthPrice: useSelector((state: AppStateType) => state.spendsPage.currentMonthPrice),
  //   happenedEvents: useSelector((state: AppStateType) => state.spendsPage.happenedEvents),

  //   profile: useSelector((state: AppStateType) => state.profilePage.profile)
  // }

  // обновляем счётчик недель . . .
  useEffect(() => {
    dispatch(actions.setDayInMonth(dayInMonth + 1))
    // еженедельные покупки . . .
    if (day % 7 === 0 && day !== 0) {
      const generateNews = (): any => {
        // stocksNews / businessNews / personNews . . .
        let newsType = getRandomNumber(2)
        if (newsTypeArray[newsType].ableToShow) {
          let company = ''
          if(newsTypeArray[newsType].type === 'stocksNews') {
            company = companies[getRandomNumber(companies.length)]
          }
          if (newsTypeArray[newsType].type === 'businessNews') {
            if (myBusinesses.length !== 0) {
              let companyIndex = getRandomNumber(myBusinesses.length)
              company = myBusinesses[companyIndex].name
            } else {
              return generateNews()
            }
          }
          dispatch(setNewsThunk(newsTypeArray[newsType].type, company))
        } else {
          generateNews()
        }
      }
      // создаем новости каждые две недели
      if(day % 14 === 0 && day !== 0) {
        generateNews()
        // отправляем данные для сохранения игры . . .
        // saveGame(dataForSave)
      }
      // еженедельная трата . . .
      // dispatch(actions.weekSpend(difficulty))
      dispatch(weekSpendThunk())

      // обновление акций . . .
      if(stocks.length !== 0) {
        // обновление цен на акции . . .
        dispatch(stocksActions.indexingStocks())
        // обновление цены всего портфеля игрока...
        dispatch(stocksActions.indexStocksSummaryPrice())
      }
    }
    // если сегодня последний день месяца, то обновляем месяц и выдаём зарплату игроку . . .
    if(dayInMonth === months[month].duration) {
      dispatch(actions.setMonth(month + 1))
      doAllThings()
    }
  }, [day])

  // обновляем год после декабря . . .
  useEffect(() => {
    if (month === 11 && dayInMonth === 31) {
      dispatch(actions.setMonth(0))
      doAllThings()
    }
  }, [month, dayInMonth])

  // делает всё необходимое при наступлении нового месяца
  const doAllThings = () => {
    // ставим первый день в месяце
    dispatch(actions.setDayInMonth(1))
    // зануляем траты прошлого месяца
    dispatch(spendsActions.resetCurrentMonth())
    // чистая прибыль персонажа в месяц
    dispatch(actions.updateWallet(income))
    // создаем предложение по недвижимости
    dispatch(realtyActions.generateActiveRealty())
    // уменьшаем необходимую выплату по долгу на месячную ставку
    dispatch(profileActions.updateExpenses())
    // если мы выплатили целиком какой либо долг, то у нас растет ЗП
    dispatch(updateIncome())
    if (income >= 250) {
      dispatch(stocksActions.indexingBonds())
    }
    // если наш доход перевалил за $1000 или $4500 в месяц, то мы увеличиваем траты
    if ((income >= 1000 && spendsLevel === 1) || (income >= 4500 && spendsLevel === 2)) {
      dispatch(spendsActions.setSpendsLevel())
      dispatch(spendsActions.setEventsPrice())
    }

    if ((income < 1000 && spendsLevel === 2) || (income < 4500 && spendsLevel === 3)) {
      dispatch(spendsActions.decreaseSpendsLevel())
      dispatch(spendsActions.setEventsPrice())
    }

  }

  return (
    <>
        <Breadcrumb className='gameProfitHeader'>
          {screenWidth > 1024
          && <Breadcrumb.Item className='gameProfitHeader__Day'>
              {activeDay}
            </Breadcrumb.Item>}
          <Breadcrumb.Item className='gameProfitHeader__Month'>
            {dayInMonth}
            {screenWidth > 480
              ? ` ${activeMonth}`
              : `.${month < 9 ? '0' : ''}${month+1}`}
          </Breadcrumb.Item>
          {screenWidth > 1024
          && <Breadcrumb.Item className="gameProfitHeader__Day">
            <b>{day}</b> день
          </Breadcrumb.Item>}

        </Breadcrumb>
    </>
  )
}