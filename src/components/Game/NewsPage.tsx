import { CheckSquareOutlined, InboxOutlined } from "@ant-design/icons/lib/icons";
import { Button } from "antd";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsActions } from "../../redux/news-reducer";
import { ChanceType } from "../../redux/realty-reducer";
import { settingsActions } from "../../redux/settings-reducer";
import { getMyStocksSelector, getStocksSelector } from "../../redux/stocks-selector";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";


export const NewsPage = () => {

  const dispatch = useDispatch()
  const news = useTypedSelector(state => state.newsPage.news)
  const archive = useTypedSelector(state => state.newsPage.archive)
  const [isArchiveShown, setIsArchiveShown] = useState(false)

  const readAllNews = () => {
    dispatch(newsActions.setAllToArchive())
  }

  return (
    <>
      <div className="gameNews">
        <div className="gameNewsContent">
          <div className="container">
            <div className="gameNewsMenu">
              {isArchiveShown
                ? <Button onClick={() => setIsArchiveShown(false)}>Новости</Button>
                : <>
                  <Button onClick={() => setIsArchiveShown(true)} >Архив <InboxOutlined /></Button>
                  <Button onClick={() => readAllNews()}>Прочитать всё </Button>
                </>
              }
            </div>
            {isArchiveShown
             ? <div className="gameNewsBlocks gameNewsBlocks__reverse">
                {archive.map((newsBlock, index) =>
                  <RenderNewsBlock
                    key={index}
                    title={newsBlock.title}
                    company={newsBlock.company}
                    amount={newsBlock.amount}
                    index={index}
                    isArchive={true}
                    month={newsBlock.month}
                    type={newsBlock.type}
                    dayInMonth={newsBlock.dayInMonth}
                  />
                )}
              </div>
              : <div className="gameNewsBlocks">
                {news.map((newsBlock, index) =>
                  <RenderNewsBlock
                    key={index}
                    title={newsBlock.title}
                    company={newsBlock.company}
                    amount={newsBlock.amount}
                    index={index}
                    isArchive={false}
                    month={newsBlock.month}
                    dayInMonth={newsBlock.dayInMonth}
                    type={newsBlock.type}
                    condition={newsBlock.condition}
                    setPopups={setPopups}
                  />
                )}
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

interface NewsBlockType {
  title: string
  company: string
  amount: number
  index: number
  isArchive: boolean
  month: string
  dayInMonth: number
  type?: string
  condition?: string | number
  setPopups: (object: any) => void
}

export const RenderNewsBlock: FC<NewsBlockType> = (props) => {

  const dispatch = useDispatch()

  const stocks = useSelector(getStocksSelector)
  const myStocks = useSelector(getMyStocksSelector)
  const myRealty = useTypedSelector(state => state.realtyPage.myRealty)
  const realtyRegion = useTypedSelector(state => state.realtyPage.realtyRegion)
  const themeColor = props.type === 'person' 
    ? '#388e3c' 
    : props.type === 'stock' 
      ? '#439093' 
      : props.type === 'realty' 
        ? '#f4511e ' : '#b71c1c'
        
  const moveToArchive = () => {
    dispatch(newsActions.setToArchive(props.index))
  }

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }
  // открываем окно с акцией...
  const buyStocks = () => {
    stocks.map((stock, index) => {
      if (stock.title === props.company) {
        props.setPopups((popups: any) => {
          
        })
        props.setActiveStock(stocks[index])
      }
    })
    props.setIsHistoryShown(true)
    onChangeTime(0)
  }

  const sellStocks = () => {
    myStocks.map((stock, index) => {
      if (stock.title === props.company) {
        props.setMyActiveStock(index)
      }
    })
    props.setIsStockToSell(true)
    onChangeTime(0)
  }
  console.log(props.type)
  return (
    <>
      <div className="gameNewsBlock">
        <div className="gameNewsBlock__Title" style={{background: themeColor}}>
          <b>Новость!</b>
          <span style={{color: '#def4e4'}}> / {props.month} {props.dayInMonth}</span>
        </div>
        <div className="gameNewsBlock__News">
          <div className="gameNewsBlock__NewsTitle">
            <b>{props.title}</b>
          </div>
          {/* если новость связана с акцией... */}
          {props.company !== '' && props.type === 'stock'
            ? <div className='gameNewsBlock__NewsCompany'>
                <i>{props.company}</i>
              </div>
            : ''
          }
          {/* если новость связана с недвижимостью... */}
          {props.company !== '' && props.type === 'realty'
            ? <div>
                {/* props.company === 'low' | 'medium' | 'high */}
                <div className="gameNewsBlock__NewsRealty">
                  Район: {realtyRegion[props.company as ChanceType]}
                </div>
                {myRealty.some(realty => realty.region === props.company) 
                  ? <Button>Продать</Button>
                  : 'У вас нет недвижимости в этом районе.'
                }
              </div>
            : ''}
          {/*  */}
          {props.type === 'stock' && props.condition === 0
            ? <div className="gameNewsBlock__NewsButton">
                <Button onClick={buyStocks}>Купить акцию</Button>
              </div>
            : ''
          }
          {/*  */}
          {props.type === 'stock' && props.condition === 1 && myStocks.some(s => s.title === props.company)
            ? <div className="gameNewsBlock__NewsButton">
                <Button onClick={sellStocks}>Продать акцию</Button>
              </div>
            : ''
          }
          {/*  */}
          {props.amount !== 0
            ? <div className="gameNewsBlock__NewsPrice">
              {props.amount > 0
                ?
                  <>
                    Вы заработали
                    <span className="gameNewsBlock__NewsPriceBold">
                        ${props.amount}
                    </span>
                  </>
                : <>
                    {props.title === 'Рождение ребенка это большое событие!'
                      ? 
                        <>
                          Ежемесячная трата на ребенка:
                          <span className="gameNewsBlock__NewsPriceBold">
                            ${-props.amount}
                          </span>
                        </>
                      : 
                        <>
                          Вы потратили
                          <span className="gameNewsBlock__NewsPriceBold">
                            ${-props.amount}
                          </span>
                        </>
                      }
                  </>
              }
              </div>
            : ''}
        </div>
        {/* кнопка для помещения новости в архив . . . */}
        {props.isArchive
          ? ''
          :
            <div className='gameNewsBlock__Footer' >
              <button onClick={() => moveToArchive()} className='gameNewsBlock__FooterButton'>
                <CheckSquareOutlined />
              </button>
              <div className="gameNewsBlock__FooterText">
                <b>Я прочитал</b>
              </div>
            </div>}
        </div>
    </>
  )
}