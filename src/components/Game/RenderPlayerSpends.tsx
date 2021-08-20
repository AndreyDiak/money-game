import React, {FC} from "react";
import {RenderPlayerSpend} from "./RenderPlayerSpend";
import {useSelector} from "react-redux";
import {getHappenedEventsSelector, getMonthSelector, getMonthsSelector} from "../../redux/game-selector";

// type RenderPlayerSpendsType = {
//   happenedEvents: any
//   months: string[]
// }
export const RenderPlayerSpends: FC = (props) => {
  const month = useSelector(getMonthSelector)
  const months = useSelector(getMonthsSelector)
  const happenedEvents = useSelector(getHappenedEventsSelector)

  return (
    <>
      <div className='gameSpend bannerBack' >
        <div className="gameSpendHeader">
          Ваши траты
        </div>
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
      </div>
    </>
  )
}