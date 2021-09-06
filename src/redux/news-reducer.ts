import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {actions} from "./game-reducer";
import {stocksActions} from "./stocks-reducer";
import {businessActions} from "./business-reducer";
import {getRandomNumber} from "../utils/getRandomNumber";
import {profileActions, updateIncome} from "./profile-reducer";

const ADD_NEWS = 'newsPage/ADD_NEWS'
const ABLE_TO_SHOW = 'newsPage/ABLE_TO_SHOW'
const SET_TO_ARCHIVE = 'newsPage/SET_TO_ARCHIVE'
const RESET_NEWS = 'newsPage/RESET_NEWS'
const ADD_NEWS_INCOME = 'newsPage/ADD_NEWS_INCOME'
const ADD_NEWS_EXPENSES = 'newsPage/ADD_NEWS_EXPENSES'
const MAX_CHILDREN = 'newsPage/MAX_CHILDREN'

let initialState = {
  // массив с произошедшими новостями . . .
  news: [] as newsArrayType[],
  archive: [] as newsArrayType[],
  newsTypes: [
    // {
    //   type: 'businessNews' as NewsTypes,
    //   ableToShow: false,
    //   variants: [
    //     {
    //       variantType: 'positive' as VariantType,
    //       events: [
    //         {
    //           type: 'restaurant',
    //           titles: [
    //             'Ваш ресторан становится популярнее, доходы растут!',
    //             'Критики написали хороший отзыв, ждите прилив гостей!',
    //             'Начался сезон, ждите гостей!'
    //           ]
    //         }, {
    //           type: 'garage',
    //           titles: [
    //             'Начался сезон, плата за гараж увеличена'
    //           ]
    //         }, {
    //           type: 'service',
    //           titles: [
    //             'Друзья рассказали о вашем сервисе другим, доход растёт!',
    //             'Начался сезон, вы нужны автолюбителям!'
    //           ]
    //         }, {
    //           type: 'hotel',
    //           titles: [
    //             'Популярность отеля растёт! Доход растёт',
    //             'Критики довольны сервисом, их отзыв хорошо влияет на выручку'
    //           ]
    //         },
    //       ]
    //     }, {
    //       variantType: 'negative' as VariantType,
    //       events: [
    //       {
    //         type: 'restaurant',
    //         titles: [
    //           'Критики не довольны вашим обслуживанием, выручка падает',
    //           'Сезон подошёл к концу, скоро доход будет падать'
    //         ]
    //       }, {
    //         type: 'garage',
    //         titles: [
    //           'Сезон подходит к концу, доход падает'
    //         ]
    //       }, {
    //         type: 'service',
    //         titles: [
    //           'Сезон подходит к концу, доход уменьшается',
    //           'Друзья остались недовольны сервисом!'
    //         ]
    //       }, {
    //         type: 'hotel',
    //         titles: [
    //           'Популярность отеля падает! Это плохо сказывается на доходах',
    //           'Критикам не понравился ваш отель, их отзывы неутешительные!'
    //         ]
    //       }
    //     ]
    //     }, {
    //       variantType: 'neutral' as VariantType,
    //       events: [
    //         'С вашим бизнесом всё в порядке! Так держать!',
    //         'Иметь бизнесс всегда хорошо, продолжайте в том же духе!'
    //       ]
    //     }
    //   ]
    // },
    {
      type: 'stocksNews' as NewsTypes,
      ableToShow: false,
      variants: [
        {
          variantType: 'positive' as VariantType,
          titles: [
            'Компания получила приличное пожертвование, вам следует проследить за ней!',
            'Квартальный отчет показал хорошие результаты, доход компании вырос, скоро будет рост акций тоже!',
            'Идёт активный рост компании, это хорошо влияет на её акции',
            'Компания заняла лидирующие позиции в своём сегменте рынка, думаю вам стоит присмотреться к ней!',
            'Брокеры предсказывают рост доходов в следующем квартале, это может повлиять на акции',
            'Компанию продали под крыло большего гиганта, новое начальство знает, что надо делать!',
          ]
        }, {
          variantType: 'negative' as VariantType,
          titles: [
            'Компания терпит убыдки! Скоро акции полетят вниз!',
            'Квартальный отчет показал неутешительные результаты, доход компании упал!',
            'В связи с последними новостями, у компании череда неудач, будьте внимательны',
            'Компания потеряла лидирующие места в гонке за господством на рынке, это ударит по акциям',
            'Брокеры предсказывают падение доходов в следующем квартале, следите внимательно',
            'Компания расспадается и возможно уйдёт с рынка, следите за ней внимательнее',
          ]
        }, {
        variantType: 'neutral' as VariantType,
          titles: [
            'На рынке акций всё спокойно! Можете не волноваться',
            'Компании S&P 500 показывают хорошие квартальный результаты после карантинных падений',
            'Вы можете спать спокойно, пока деньги работают за вас, а не вы за них'
          ]
        }
      ]
    },
    {
      type: 'personNews' as NewsTypes,
      ableToShow: true,
      variants: [
        {
          variantType: 'positive' as VariantType,
          events: [
            {
              // одноразовые бонусы игроку
              type: 'one',
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
            }, {
              // новости, которые будут довать буст к зарплате
              type: 'regular',
              titles: [
                {title: 'Вы помогаете по работе коллеге, прибавка к зарплате!', amount: 70},
                {title: 'Друг попросил отдать ему гараж под сервис, ваша доля в месяц: ', amount: 120},
                // {title: 'Вы сдаёте комнату, месячная плата', amount: 300}
              ]
            }
          ]
        },
        {
          variantType: 'negative' as VariantType,
          events: [
            {
              type: 'one',
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
              type: 'regular',
              titles: [
                {title: 'У вас родился ребёнок! Поздравляем!', amount: -125},
                // {title: 'Стройка на даче занимает слишком много сил, и не только', amount: -70},
                {title: 'Обеспечение родителей, вещь важная!', amount: -25},

              ]
            }
          ]
        },
        {
          variantType: 'neutral' as VariantType,
          events: [
            'Хочешь сбежать от повседневности — не останавливайся в развитии.',
            '— Сегодня хороший день, чтобы умереть. — Ты всегда так говоришь. — Всегда так и есть.',
            'Человек, живущий обычной, размеренной жизнью, быстро становится рабом собственных привычек.',
            'Иногда, знаете ли, полезно съесть подгнившую селёдочную голову, чтобы оценить прелесть обычного повседневного обеда.',
            'Повседневность начинается на улице, а кончается в бесконечности.',
            'Взрослые -это дети, научившиеся обманывать ещё и себя.',
            'Год новый, а проблемы всё те же…'
          ]
        }
      ]
    }
  ],
  newsIncome: [

  ] as {title: string, amount: number}[],
  newsExpenses: [

  ] as {title: string, amount: number}[],
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
    // зануление новостей
    case RESET_NEWS:
      return {
        ...state,
        news: [] as newsArrayType[]
      }
    case ADD_NEWS_INCOME:
      return {
        ...state,
        newsIncome: [
          ...state.newsIncome,
          action.news
        ]
      }
    case ADD_NEWS_EXPENSES:
      return {
        ...state,
        newsExpenses: [
          ...state.newsExpenses,
          action.news
        ]
      }
    case MAX_CHILDREN:

      let newsTypeCopy = [...state.newsTypes]
      // @ts-ignore
      newsTypeCopy[1].variants[1].events[1].titles.splice(1, 1)
      return {
        ...state,
        newsTypes: newsTypeCopy
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
  resetNews: () => ({type: RESET_NEWS} as const),
  addNewsIncome: (news: any) => ({type: ADD_NEWS_INCOME, news} as const),
  addNewsExpenses: (news: any) => ({type: ADD_NEWS_EXPENSES, news} as const),
  maxChildren: () => ({type: MAX_CHILDREN} as const)
}

export const setNewsThunk = (newsType: NewsTypes, company: string): NewsThunkType => (dispatch, getState) => {
  const state = getState().newsPage
  const dayInMonth = getState().gamePage.daysInMonth
  const month = getState().gamePage.months[getState().gamePage.month].name
  const children = getState().profilePage.children
  let newsCopy = [...state.news]
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

  state.newsTypes.map((newsTypes, index) => {
    if(newsTypes.type === newsType) {
      // выбираем одну из 3 видов новостей хорошая / плохая / нейтральная
      let condition = getRandomNumber(newsTypes.variants.length)
      // 0 - хорошая / 1 - плохая / 2 - нейтральная
      switch (newsType) {
        case "personNews":
          // если новость плохая или хорошая . . .
          if(condition === 0 || condition === 1) {
            // вид новости . . .
            let typeOfNews = newsTypes.variants[condition] // positive / negative / neutral
            // @ts-ignore / вид выплаты (один раз или постоянная)
            let typeOfPayout = getRandomNumber(typeOfNews.events.length)
            // @ts-ignore / выбираем новость
            let titleIndex = getRandomNumber(typeOfNews.events[typeOfPayout].titles.length)

            // @ts-ignore | если рождается ребёнок
            if(typeOfNews.events[typeOfPayout].titles[titleIndex].title === 'У вас родился ребёнок! Поздравляем!') {
              // @ts-ignore / добавляем ребенка в профиль
              dispatch(profileActions.newChild())

              let childrenCount = 0
              children.forEach(child => {
                childrenCount += child
              })
              // считаем кол-во детей, если их 3 то больше детей быть не может
              if (childrenCount === 3) {
                dispatch(newsActions.maxChildren())
              }
            }

            // @ts-ignore/ заголовок новости
            news.title = typeOfNews.events[typeOfPayout].titles[titleIndex].title
            // @ts-ignore/ цена
            news.amount = typeOfNews.events[typeOfPayout].titles[titleIndex].amount
            // @ts-ignore / обновляем баланс или доход игрока
            dispatch(actions.getNewsPayout(typeOfNews.events[typeOfPayout].type, news.amount))

            // если новость влияет на доходы или расходы то мы добовляем ее в доход профиля
            if (typeOfPayout === 1) {
              condition === 0
                ? dispatch(newsActions.addNewsIncome({title: news.title, amount: news.amount}))
                : dispatch(newsActions.addNewsExpenses({title: news.title, amount: news.amount}))

              dispatch(updateIncome())
            }
          } else {
            // если новость нейтральная . . .
            // @ts-ignore
            let titleIndex = Number((Math.random() * (newsTypes.variants[condition].events.length - 1)).toFixed(0))
            // @ts-ignore
            // создаём новость . . .
            news.title = newsTypes.variants[condition].events[titleIndex]
            news.amount = 0
          }
          news.type = 'person'
          break
        case "stocksNews":
          // @ts-ignore
          let titleIndex = Number((Math.random() * (newsTypes.variants[condition].titles.length - 1)).toFixed(0))
          // @ts-ignore
          news.title = newsTypes.variants[condition].titles[titleIndex]
          if (condition === 0 || condition === 1) {
            news.company = company
            // продолжительность роста / падения акции
            const growType = condition === 0 ? 'up' : 'down'
            const timeInterval = Number((Math.random() * 4 + 3).toFixed(0))

            // @ts-ignore
            dispatch(stocksActions.setPriceChangeInterval(company, timeInterval, growType))
          }
          news.type = 'stock'
          news.condition = condition
          break
        case "businessNews":
          if (condition === 0 || condition === 1) {
            console.log(condition)
            // вид новости . . .
            let typeOfNews = newsTypes.variants[condition] // positive / negative / neutral

            let incomeAmount = Number((Math.random() * 100 + 50).toFixed(0))

            let businessType: number
            switch (company) {
              case 'Ресторан':
                businessType = 0
                break
              case 'Сдача гаража':
                businessType = 1
                break
              case 'Сервис':
                businessType = 2
                break
              case 'Мотель':
                businessType = 3
                break
              default:
                return null
            }
            // @ts-ignore
            let titleIndex = getRandomNumber(typeOfNews.events[businessType].titles.length)

            // @ts-ignore // заголовок новости
            news.title = typeOfNews.events[businessType].titles[titleIndex]
            // название бизнеса
            news.company = company
            // прибыль/убыль бизнеса
            news.amount = incomeAmount

            // @ts-ignore / обновляем доход пользователя . . .
            condition === 0 ? dispatch(actions.updateBusinessIncome(incomeAmount)) : dispatch(actions.updateBusinessIncome(-incomeAmount))
            // @ts-ignore
            condition === 0 ? dispatch(businessActions.updateBusinessIncome(company, incomeAmount)) : dispatch(businessActions.updateBusinessIncome(company, -incomeAmount))
          } else {
            // @ts-ignore / если новость не связана с доходом то просто отдаем заголовок . . .
            let titleIndex = getRandomNumber(newsTypes.variants[condition].events.length)
            // @ts-ignore
            news.title = newsTypes.variants[condition].events[titleIndex]
          }
          news.type = 'business'
          break
      }
    }
    return null
  })
  // диспачим обновленные новости в state
  newsCopy = [news, ...newsCopy]
  dispatch(newsActions.addNews(newsCopy))
}

export type NewsTypes = 'stocksNews' | 'businessNews' | 'personNews'
export type VariantType = 'positive' | 'negative' | 'neutral'
export type newsArrayType = {
  title: string
  amount: number
  company: string
  month: string
  dayInMonth: number
  type: string
  condition: string | number
}
type NewsActionsType = InferActionsType<typeof newsActions>

export type NewsThunkType = ThunkAction<any, AppStateType, unknown, NewsActionsType>