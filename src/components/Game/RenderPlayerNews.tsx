import { CheckCircleOutlined } from "@ant-design/icons/lib/icons";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Tabs} from "antd";
import {newsActions} from "../../redux/news-reducer";

const { TabPane } = Tabs

export const RenderPlayerNews = () => {

  const news = useSelector((state: AppStateType) => state.newsPage.news)
  const archive = useSelector((state: AppStateType) => state.newsPage.archive)


  return (
    <>
      <div className="gameNews bannerBack">
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
                  />
                )}
              </div>
            </TabPane>
            <TabPane tab="Архив" key="2">
              <div className="gameNewsBlocks">
                {archive.map((newsBlock, index) =>
                  <RenderNewsBlock
                    key={index}
                    title={newsBlock.title}
                    company={newsBlock.company}
                    amount={newsBlock.amount}
                    index={index}
                    isArchive={true}
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
}

export const RenderNewsBlock: FC<NewsBlockType> = (props) => {

  const dispatch = useDispatch()

  const moveToArchive = () => {
    dispatch(newsActions.setToArchive(props.index))
  }

  return (
    <>
      <div className="gameNewsBlock">
        <div className="gameNewsBlock__Title">
          <b>Новость!</b>
        </div>
        <div className="gameNewsBlock__News">
          <div className="gameNewsBlock__NewsTitle">
            <b>{props.title}</b>
          </div>
          {props.company !== ''
            ? <div>
              <i>{props.company}</i>
          </div>
            : ''
          }
          {props.amount !== 0
            ? <div className="gameNewsBlock__NewsPrice">
                {props.amount}
              </div>
            : ''}
        </div>
        {/* кнопка для помещения новости в архив . . . */}
        {props.isArchive
          ? ''
          :
            <div>
              <hr/>
              <button onClick={() => moveToArchive()}>
                <CheckCircleOutlined />
              </button>
            </div>}
        </div>
    </>
  )
}