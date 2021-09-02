import {CheckSquareOutlined} from "@ant-design/icons/lib/icons";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Button, Tabs} from "antd";
import {newsActions} from "../../redux/news-reducer";
import {getMyStocksSelector, getStocksSelector} from "../../redux/stocks-selector";
import {settingsActions} from "../../redux/settings-reducer";

const { TabPane } = Tabs

export const RenderPlayerNews:FC<{setIsHistoryShown: any, setActiveStock: any, setMyActiveStock: any, setIsStockToSell: any}> = (props) => {

  const news = useSelector((state: AppStateType) => state.newsPage.news)
  const archive = useSelector((state: AppStateType) => state.newsPage.archive)

  return (
    <>
      <div className="gameNews">
        <div className="gameNewsContent">
          <Tabs defaultActiveKey="1" centered className='gameNewsContent__Tabs'>
            <TabPane tab="Новости" key="1">
              <div className="gameNewsBlocks">
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
                    setIsHistoryShown={props.setIsHistoryShown}
                    setActiveStock={props.setActiveStock}
                    setMyActiveStock={props.setMyActiveStock}
                    setIsStockToSell={props.setIsStockToSell}
                  />
                )}
              </div>
            </TabPane>
            <TabPane tab="Архив" key="2">
              <div className="gameNewsBlocks gameNewsBlocks__reverse">
                {archive.map((newsBlock, index) =>
                  <RenderNewsBlock
                    key={index}
                    title={newsBlock.title}
                    company={newsBlock.company}
                    amount={newsBlock.amount}
                    index={index}
                    isArchive={true}
                    month={newsBlock.month}
                    dayInMonth={newsBlock.dayInMonth}
                  />
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

type NewsBlockType = {
  title: string
  company: string
  amount: number
  index: number
  isArchive: boolean
  month: string
  dayInMonth: number
  type?: string
  condition?: string | number
  setIsHistoryShown?: any
  setActiveStock?: any
  setMyActiveStock?: any
  setIsStockToSell?: any
}

export const RenderNewsBlock: FC<NewsBlockType> = (props) => {

  const dispatch = useDispatch()

  const stocks = useSelector(getStocksSelector)
  const myStocks = useSelector(getMyStocksSelector)

  const moveToArchive = () => {
    dispatch(newsActions.setToArchive(props.index))
  }

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const buyStocks = () => {
    stocks.map((stock, index) => {
      if (stock.title === props.company) {
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

  return (
    <>
      <div className="gameNewsBlock">
        <div className="gameNewsBlock__Title">
          <b>Новость!</b>
          <span style={{color: '#def4e4'}}> / {props.month} {props.dayInMonth}</span>
        </div>
        <div className="gameNewsBlock__News">
          <div className="gameNewsBlock__NewsTitle">
            <b>{props.title}</b>
          </div>

          {props.company !== ''
            ? <div className='gameNewsBlock__NewsCompany'>
                <i>{props.company}</i>
              </div>
            : ''
          }

          {props.type === 'stock' && props.condition === 0
            ? <div className="gameNewsBlock__NewsButton">
                <Button onClick={() => buyStocks()}>Купить акцию</Button>
              </div>
            : ''
          }
          {props.type === 'stock' && props.condition === 1 && myStocks.some(s => s.title === props.company)
            ? <div className="gameNewsBlock__NewsButton">
                <Button onClick={() => sellStocks()}>Продать акцию</Button>
              </div>
            : ''
          }
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
                    Вы потратили
                    <span className="gameNewsBlock__NewsPriceBold">
                        ${-props.amount}
                    </span>
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