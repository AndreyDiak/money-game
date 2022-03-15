import { ThunkAction } from "redux-thunk";
import { getRandomNumber } from "../utils/getRandomNumber";
import { actions, GameActionsType } from "./game-reducer";
import { profileActions, ProfileActionsType, updateIncome } from "./profile-reducer";
import { stocksActions, StocksActionType } from "./stocks-reducer";
import { AppStateType, InferActionsType } from "./store";

const ADD_NEWS = 'newsPage/ADD_NEWS'
const ABLE_TO_SHOW = 'newsPage/ABLE_TO_SHOW'
const SET_TO_ARCHIVE = 'newsPage/SET_TO_ARCHIVE'
const SET_ALL_TO_ARCHIVE = 'newsPage/SET_ALL_TO_ARCHIVE'
const RESET_NEWS = 'newsPage/RESET_NEWS'
// const ADD_NEWS_INCOME = 'newsPage/ADD_NEWS_INCOME'
// const ADD_NEWS_EXPENSES = 'newsPage/ADD_NEWS_EXPENSES'
const SET_NEWS = 'newsPage/SET_NEWS'

let initialState = {
  // массив с произошедшими новостями . . .
  news: [] as newsArrayType[],
  archive: [] as newsArrayType[],
  newsTypes: [
    {
      type: 'personNews' as NewsTypes,
      ableToShow: true,
      variants: [
        {
          variantType: 'positive',
          titles: [
            {title: 'Вы получили бонус на работе. Так держать!', amount: 100},
            {title: 'Разовая выплата от правительства', amount: 150},
            {title: 'Вы победели в лотерее, поздравляем!', amount: 300},
            {title: 'Вам досталось наследство семьи! Потратьте его с умом', amount: 500},
            {title: 'Продажа квартиры родственников!', amount: 1000},
            {title: 'Вы закрыли проект на работе и получили свою долю', amount: 250},
            {title: 'Кэшбэк по карте', amount: 200},
            {title: 'У вашего босса хорошее настроение, вы получили премию', amount: 220}
          ]
        },
        {
          variantType: 'negative',
          titles: [
            {title: 'Вы проиграли в лотерее', amount: -200},
            {title: 'Онлайн казино дело такое!', amount: -100},
            {title: 'От цен на бензин хочется плакать!', amount: -80},
            {title: 'На вас напали в переулке!', amount: -150},
            {title: 'Случайный прохожий попросил у вас денег', amount: -50},
            {title: 'По пути на работу вы зашли за чашечкой кофе', amount: -75},
            {title: 'На выходных вы решили себя побаловать!', amount: -120},
            {title: 'Выписка с штрафа', amount: -175}
          ]
        },
        {
          variantType: 'neutral',
          titles: [
            {title: 'Хочешь сбежать от повседневности — не останавливайся в развитии.'},
            {title: '— Сегодня хороший день, чтобы умереть. — Ты всегда так говоришь. — Всегда так и есть.'},
            {title: 'Человек, живущий обычной, размеренной жизнью, быстро становится рабом собственных привычек.'},
            {title: 'Иногда, знаете ли, полезно съесть подгнившую селёдочную голову, чтобы оценить прелесть обычного повседневного обеда.'},
            {title: 'Повседневность начинается на улице, а кончается в бесконечности.'},
            {title: 'Взрослые -это дети, научившиеся обманывать ещё и себя.'},
            {title: 'Год новый, а проблемы всё те же…'},
          ]
        }
      ] as VariantType[]
    },
    {
      type: 'stocksNews' as NewsTypes,
      ableToShow: false,
      variants: [
        {
          variantType: 'positive',
          titles: [
            {title: 'Компания получила приличное пожертвование, вам следует проследить за ней!'},
            {title: 'Квартальный отчет показал хорошие результаты, доход компании вырос, скоро будет рост акций тоже!'},
            {title: 'Идёт активный рост компании, это хорошо влияет на её акции'},
            {title: 'Компания заняла лидирующие позиции в своём сегменте рынка, думаю вам стоит присмотреться к ней!'},
            {title: 'Брокеры предсказывают рост доходов в следующем квартале, это может повлиять на акции'},
            {title: 'Компанию продали под крыло большего гиганта, новое начальство знает, что надо делать!'},
          ]
        }, 
        {
          variantType: 'negative',
          titles: [
            {title: 'Компания терпит убыдки! Скоро акции полетят вниз!'},
            {title: 'Квартальный отчет показал неутешительные результаты, доход компании упал!'},
            {title: 'В связи с последними новостями, у компании череда неудач, будьте внимательны'},
            {title: 'Компания потеряла лидирующие места в гонке за господством на рынке, это ударит по акциям'},
            {title: 'Брокеры предсказывают падение доходов в следующем квартале, следите внимательно'},
            {title: 'Компания расспадается и возможно уйдёт с рынка, следите за ней внимательнее'},
          ]
        }, 
        {
        variantType: 'neutral',
          titles: [
            {title: 'На рынке акций всё спокойно! Можете не волноваться'},
            {title: 'Компании S&P 500 показывают хорошие квартальный результаты после карантинных падений'},
            {title: 'Вы можете спать спокойно, пока деньги работают за вас, а не вы за них'}
          ]
        }
      ] as VariantType[]
    },
    {
      type: 'realtyNews' as NewsTypes,
      ableToShow: true,
      variants: [
        {
          variantType: 'positive',
          titles: [
            {title: 'Начало сезона, новые приезжие хотят купить дом.'},
            {title: 'Развитие инфроструктуры в районе положительно влияет на цены.'}
          ]
        },
        {
          variantType: 'negative',
          titles: [
            {title: 'В районе наблюдаются проблемы с экологией, спрос на недвижимость падает.'},
            {title: 'Рост преступности негативно влияет на цены в этом районе.'}
          ]
        },
        {
          variantType: 'neutral',
          titles: [
            {title: 'Рынок недвижимости в полном порядке.'},
          ]
        }
      ] as VariantType[]
    }
  ],
  newsIncome: [] as newsExInType[],
  newsExpenses: [] as newsExInType[],
}

export type InitialNewsStateType = typeof initialState

export const newsReducer = (state = initialState, action: NewsActionsType): InitialNewsStateType => {
  switch (action.type) {
    // добавление новости в список
    case ADD_NEWS:
      // копия прошлых новостей . . .
      return {
        ...state,
        news: action.news
      }
    // возможность показывать новости про акции / бизнесс (изначально нельзя)
    case ABLE_TO_SHOW:
      return {
        ...state,
        newsTypes: state.newsTypes.map(newsType => {
          if(newsType.type === action.types) {
            return {...newsType, ableToShow: true}
          }
          return newsType
        })
      }
    // добавление новости в архив
    case SET_TO_ARCHIVE:

      let newsCopy = [...state.news]
      let archiveCopy = [...state.archive]

      let archiveNews = newsCopy.splice(action.index, 1)

      // @ts-ignore
      archiveCopy.push(archiveNews[0])

      return {
        ...state,
        news: newsCopy,
        archive: archiveCopy
      }
    case SET_ALL_TO_ARCHIVE:

      let allNewsCopy = [...state.news]
      let allArchiveCopy = [...state.archive]

      allNewsCopy.forEach(news => {
        allArchiveCopy.push(news)
      })

      return {
        ...state,
        archive: allArchiveCopy,
        news: [] as newsArrayType[]
      }
    // зануление новостей
    case RESET_NEWS:
      return {
        ...state,
        news: [] as newsArrayType[]
      }
    // case ADD_NEWS_INCOME:
    //   return {
    //     ...state,
    //     newsIncome: [
    //       ...state.newsIncome,
    //       action.news
    //     ]
    //   }
    // case ADD_NEWS_EXPENSES:
    //   return {
    //     ...state,
    //     newsExpenses: [
    //       ...state.newsExpenses,
    //       action.news
    //     ]
    //   }
    case SET_NEWS:
      return {
        ...state,
        news: action.news,
        newsIncome: action.newsIncome,
        newsExpenses: action.newsExpenses
      }
    default:
      return {
        ...state
      }
  }
}

export const newsActions = {
  addNews: (news: newsArrayType[]) => ({type: ADD_NEWS, news} as const),
  setAbleToShow: (types: NewsTypes) => ({type: ABLE_TO_SHOW, types} as const),
  setToArchive: (index: number) => ({type: SET_TO_ARCHIVE, index} as const),
  setAllToArchive: () => ({type: SET_ALL_TO_ARCHIVE} as const),
  resetNews: () => ({type: RESET_NEWS} as const),
  // addNewsIncome: (news: any) => ({type: ADD_NEWS_INCOME, news} as const),
  // addNewsExpenses: (news: any) => ({type: ADD_NEWS_EXPENSES, news} as const),
  setNewNews: (news: newsArrayType[], newsIncome: newsExInType[], newsExpenses: newsExInType[]) => ({type: SET_NEWS, news, newsIncome, newsExpenses} as const)
}

export const setNewsThunk = (newsTypeIndex: number): NewsThunkType => (dispatch, getState) => {
  const newsTypes = getState().newsPage.newsTypes
  const dayInMonth = getState().gamePage.daysInMonth

  let newsCopy = [...getState().newsPage.news]
  const month = getState().gamePage.months[getState().gamePage.month].name // name of month
  const companies = getState().stocksPage.companiesForStocks
  const childrensCount = getState().profilePage.childrenCount // childrens count...
  // создание шаблона новости
  let news = {
    title: '',
    amount: 0,
    company: '',
    type: '',
    dayInMonth: dayInMonth,
    month: month,
    condition: '' as string | number
  }
  
  if (childrensCount < 3 && getRandomNumber(100) < 5) {
    // шанс рождения ребенка примерно 5%
    news.title = 'Рождение ребенка это большое событие!'
    news.amount = -125
    
    dispatch(profileActions.newChild())
    dispatch(updateIncome())
  } else {
    // выбираем одну из 3 видов новостей хорошая / плохая / нейтральная
    let newsConditionIndex = getRandomNumber(newsTypes[newsTypeIndex].variants.length)
    // записываем выбранный варинт новости в переменную...
    let newsVariant = newsTypes[newsTypeIndex].variants[newsConditionIndex]
    // выбираем содержание новости...
    let newsTitleIndex = getRandomNumber(newsVariant.titles.length)
    // заголовок новости...
    news.title = newsVariant.titles[newsTitleIndex].title

    switch (newsTypes[newsTypeIndex].type) {
      // новость которая напрямую связана с игроком...
      case "personNews":
        news.type = 'person'
        // если новость нейтральная
        if (newsVariant.variantType === 'negative' || newsVariant.variantType === 'positive') {
          // стоимость
          news.amount = newsVariant.titles[newsTitleIndex].amount as number
          // уменьшаем или увеличиваем баланс игрока...
          dispatch(actions.getNewsPayout('one', news.amount))
        }
        break
      // новость влияет на рынок акций...
      case "stocksNews":
        news.type = 'stock'
        news.condition = newsConditionIndex
        //
        if(newsVariant.variantType === 'negative' || newsVariant.variantType === 'positive') {
          // выбор компании...
          news.company = companies[getRandomNumber(companies.length)]
          
          const growType = newsConditionIndex === 0 ? 'up' : 'down' // grow or fall
          const timeInterval = getRandomNumber(4) + 3 // time in wheeks to grow or fall
          dispatch(stocksActions.setPriceChangeInterval(news.company, timeInterval, growType))
        }
        break
      // новость для рынка недвижимости
      case "realtyNews":
        news.type = 'realty'
        news.condition = newsConditionIndex
        if(newsVariant.variantType === 'negative' || newsVariant.variantType === 'positive') {
          // news.company = realty[getRandomNumber(realty.length)].title
          const regionChance = getRandomNumber(100)
          news.company = regionChance > 66 ? 'high' : regionChance > 33 ? 'medium' : 'low'
        }
        
        break
      default:
        return null
    }
  }
  
  // добавляем новость в начало массива...
  newsCopy = [news, ...newsCopy]
  dispatch(newsActions.addNews(newsCopy))
}

export const generateNewsThunk = (): NewsThunkType => (dispatch, getState) => {
  const newsTypeArray = getState().newsPage.newsTypes

  // newsTypeIndex == 0 -> personNews
  // newsTypeIndex == 1 -> stocksNews
  // newsTypeIndex == 3 -> realtyNews
  // newsTypeIndex == 2 -> businessNews

  let newsTypeIndex = getRandomNumber(newsTypeArray.reduce((acc, next) => next.ableToShow ? acc + 1 : acc, 0))
  // передаем индекс новости 
  dispatch(setNewsThunk(newsTypeIndex))
}

export type NewsTypes = 'stocksNews' | 'businessNews' | 'personNews' | 'realtyNews'
export type VariantType = {
  variantType: 'positive' | 'negative' | 'neutral',
  titles: {
    title: string, 
    amount?: number
  }[]
}
export type newsArrayType = {
  title: string
  amount: number
  company: string
  month: string
  dayInMonth: number
  type: string
  condition: string | number
}
export type newsExInType = {
  title: string
  amount: number
}
type NewsActionsType = InferActionsType<typeof newsActions>

export type NewsThunkType = ThunkAction<any, AppStateType, unknown, NewsActionsType | GameActionsType | StocksActionType | ProfileActionsType>