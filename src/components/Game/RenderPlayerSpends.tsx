import React, {FC, useState} from "react";
import {RenderPlayerSpend} from "./RenderPlayerSpend";
import {useDispatch, useSelector} from "react-redux";
import {getHappenedEventsSelector, getMonthSelector, getMonthsSelector} from "../../redux/game-selector";
import {Button, Tabs} from "antd";
import {eventType} from "../../redux/spends-reducer";
import {AppStateType} from "../../redux/store";

const { TabPane } = Tabs

export const RenderPlayerSpends: FC = (props) => {
  const dispatch = useDispatch()
  const month = useSelector(getMonthSelector)
  const months = useSelector(getMonthsSelector)
  const happenedEvents = useSelector(getHappenedEventsSelector)
  const currentMonthEvents = useSelector((state: AppStateType) => state.spendsPage.currentMonthEvents)
  const currentMonthPrice = useSelector((state: AppStateType) => state.spendsPage.currentMonthPrice)

  const [isHistoryShown, setIsHistoryShown] = useState(false)

  return (
    <>
      <div className='gameSpend bannerBack'>
        {/*<input style={{zIndex: 10}} onChange={(e) => dispatch(actions.setWallet(Number(e.target.value)))} type="text" />*/}
        <Button className='gameSpendButton' onClick={() => setIsHistoryShown(!isHistoryShown)}>
          {!isHistoryShown ? 'Посмотреть историю' : 'Закрыть историю'}
        </Button>
        {!isHistoryShown
          ? <>
            <div className="gameSpendBlock">
              <div className="gameSpendBlock__Title">
                <b>{months[month].name}</b>
              </div>
              <div className="gameSpendBlock__Items">
                  {currentMonthEvents.map((event: eventType, index: number) => {
                    return (
                      <>
                        <RenderPlayerSpend key={index} title={event.title} price={event.price} index={index}/>
                      </>
                    )
                  })}
              </div>
              <div className="gameSpendBlock__Footer">
                <div className="gameSpendBlock__FooterTitle">
                  Общая сумма:
                </div>
                <span className="gameSpendBlock__FooterPrice">
                <b>${currentMonthPrice}</b>
              </span>
              </div>
            </div>
           </>
          : <>
            <div className="gameSpendBlocks">
              {happenedEvents.map((events: any, index: number) => {
                return (
                  <>
                    {events.length > 0
                      ? <div key={index} className="gameSpendBlock" style={month === index ? {border: '2px solid crimson'} : {}}>
                        <div className="gameSpendBlock__Title">
                          <b>{months[index].name}</b>
                        </div>
                        <div className="gameSpendBlock__Items">
                          {events.map((event: any, i: number) =>
                            <RenderPlayerSpend
                              key={i}
                              title={event.title}
                              price={event.price}
                              index={i}
                            />
                          )}
                        </div>
                      </div>
                      : ''
                    }
                  </>
                )
              })}
            </div>
            </>
        }
      </div>
    </>
  )
}