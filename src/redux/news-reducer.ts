import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {actions} from "./game-reducer";
import {stocksActions} from "./stocks-reducer";

const ADD_NEWS = 'newsPage/ADD_NEWS'
const ABLE_TO_SHOW = 'newsPage/ABLE_TO_SHOW'
const SET_TO_ARCHIVE = 'newsPage/SET_TO_ARCHIVE'

let initialState = {
  // массив с произошедшими новостями . . .
  news: [] as newsArrayType[],
  archive: [] as newsArrayType[],
  newsTypes: [
    {
      // TODO подредачить включение типов новостей
      type: 'businessNews' as NewsTypes,
      ableToShow: false,
      variants: [
        {
          variantType: 'positive' as VariantType,
          events: [
            {
              type: 'restaurant',
              titles: [
                'Ваш ресторан становится популярнее, доходы растут!',
                'Критики написали хороший отзыв, ждите прилив гостей!',
                'Начался сезон, ждите гостей!'
              ]
            }, {
              type: 'garage',
              titles: [
                'Начался сезон, плата за гараж увеличена'
              ]
            }, {
              type: 'service',
              titles: [
                'Друзья рассказали о вашем сервисе другим, доход растёт!',
                'Начался сезон, вы нужны автолюбителям!'
              ]
            }, {
              type: 'hotel',
              titles: [
                'Популярность отеля растёт! Доход растёт',
                'Критики довольны сервисом, их отзыв хорошо влияет на выручку'
              ]
            },
          ]
        }, {
          variantType: 'negative' as VariantType,
          events: [
          {
            type: 'restaurant',
            titles: [
              'Критики не довольны вашим обслуживанием, выручка падает',
              'Сезон подошёл к концу, скоро доход будет падать'
            ]
          }, {
            type: 'garage',
            titles: [
              'Сезон подходит к концу, доход падает'
            ]
          }, {
            type: 'service',
            titles: [
              'Сезон подходит к концу, доход уменьшается',
              'Друзья остались недовольны сервисом!'
            ]
          }, {
            type: 'hotel',
            titles: [
              'Популярность отеля падает! Это плохо сказывается на доходах',
              'Критикам не понравился ваш отель, их отзывы неутешительные!'
            ]
          }
        ]
        }, {
          variantType: 'neutral' as VariantType,
          events: [
            'С вашим бизнесом всё в порядке! Так держать!',
            'Иметь бизнесс всегда хорошо, продолжайте в том же духе!'
          ]
        }
      ]
    }, {
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
    }, {
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
                {title: 'Продажа недвижимости', amount: 1000},
                {title: 'Вы закрыли проект на работе и получили свою долю', amount: 250}
              ]
            }, {
              // новости, которые будут довать буст к зарплате
              type: 'regular',
              titles: [
                {title: 'Вы помогаете по работе коллеге, прибавка к зарплате!', amount: 70},
                {title: 'Старый гараж перемонтирован под автомастерскую, ваша доля', amount: 120},
                {title: 'Вы сдаёте комнату, месячная плата', amount: 300}
              ]
            }
          ]
        }, {
          variantType: 'negative' as VariantType,
          events: [
            {
              type: 'one',
              titles: [
                {title: 'Вы проиграли в лотерее', amount: -200},
                {title: 'Онлайн казино дело такое!', amount: -100},
                {title: 'От цен на бензин хочется плакать!', amount: -80}
              ]
            }, {
              type: 'regular',
              titles: [
                {title: 'У вас родился ребёнок! Поздравляем!', amount: -200},
                {title: 'Стройка на даче занимает слишком много сил, и не только', amount: -70},
                {title: 'Обеспечение родителей, вещь важная!', amount: -50}
              ]
            }
          ]
        }, {
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
}

export type InitialNewsStateType = typeof initialState

export const newsReducer = (state = initialState, action: NewsActionsType): InitialNewsStateType => {
  switch (action.type) {
    case ADD_NEWS:
      // копия прошлых новостей . . .
      return {
        ...state,
        news: action.news
      }
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
    default:
      return {
        ...state
      }
  }
}

export const newsActions = {
  addNews: (news: newsArrayType[]) => ({type: ADD_NEWS, news} as const),
  setAbleToShow: (types: NewsTypes) => ({type: ABLE_TO_SHOW, types} as const),
  setToArchive: (index: number) => ({type: SET_TO_ARCHIVE, index} as const)
}

export const setNewsThunk = (newsType: NewsTypes, company: string): NewsThunkType => (dispatch, getState) => {
  const state = getState().newsPage
  const dayInMonth = getState().gamePage.daysInMonth
  const month = getState().gamePage.months[getState().gamePage.month].name
  let newsCopy = [...state.news]
  let news = {
    title: '',
    amount: 0,
    company: '',
    dayInMonth: dayInMonth,
    month: month
  }

  state.newsTypes.map((newsTypes, index) => {
    if(newsTypes.type === newsType) {
      // выбираем одну из 3 видов новостей хорошая / плохая / нейтральная
      let condition = Number((Math.random() * (newsTypes.variants.length - 1)).toFixed(0))
      // 0 - хорошая / 1 - плохая / 2 - нейтральная
      switch (newsType) {
        case "personNews":
          // если новость плохая или хорошая . . .
          if(condition === 0 || condition === 1) {
            // вид новости . . .
            let typeOfNews = newsTypes.variants[condition] // positive / negative / neutral
            // @ts-ignore
            // вид выплаты (один раз или постоянная)
            let typeOfPayout = Number((Math.random() * (typeOfNews.events.length - 1)).toFixed(0))
            // @ts-ignore
            // выбираем новость
            let titleIndex = Number((Math.random() * (typeOfNews.events[typeOfPayout].titles.length - 1)).toFixed(0))

            // создаём новость . . .

            // @ts-ignore
            // заголовок новости
            news.title = typeOfNews.events[typeOfPayout].titles[titleIndex].title
            // @ts-ignore
            // цена
            news.amount = typeOfNews.events[typeOfPayout].titles[titleIndex].amount

            // @ts-ignore / обновляем баланс или доход игрока
            dispatch(actions.getNewsPayout(typeOfNews.events[typeOfPayout].type, news.amount))

          } else {
            // если новость нейтральная . . .
            // @ts-ignore
            let titleIndex = Number((Math.random() * (newsTypes.variants[condition].events.length - 1)).toFixed(0))
            // @ts-ignore
            // создаём новость . . .
            news.title = newsTypes.variants[condition].events[titleIndex]
            news.amount = 0
          }
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
          // @ts-ignore / обновляем состояние акций . . .
          // dispatch(stocksActions.setPriceChangeInterval(company, timeInterval, growType))

          break
        case "businessNews":
          if (condition === 0 || condition === 1) {

            // вид новости . . .
            let typeOfNews = newsTypes.variants[condition] // positive / negative / neutral

            let incomeAmount = Number((Math.random() * 100 + 50).toFixed(0))
            // @ts-ignore
            let businessType = Number((Math.random() * (typeOfNews.events.length - 1)).toFixed(0))
            // @ts-ignore
            let titleIndex = Number(((typeOfNews.events[businessType].titles.length - 1)).toFixed(0))

            // @ts-ignore // заголовок новости
            news.title = typeOfNews.events[businessType].titles[titleIndex]
            // @ts-ignore // название бизнеса
            // news.company = typeOfNews.events[businessType].type
            news.company = company
            // прибыль/убыль бизнеса
            news.amount = incomeAmount
          } else {
            // @ts-ignore
            let titleIndex = Number((Math.random() * (newsTypes.variants[condition].events.length - 1)).toFixed(0))
            // @ts-ignore
            news.title = newsTypes.variants[condition].events[titleIndex]
          }
          break
      }

    }
    return null
  })
  // диспачим обновленные новости в state
  newsCopy.push(news)
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
}
type NewsActionsType = InferActionsType<typeof newsActions>

export type NewsThunkType = ThunkAction<any, AppStateType, unknown, NewsActionsType>