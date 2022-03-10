import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { settingsActions } from '../../../../redux/settings-reducer'
import { getConstTimeSpeedSelector } from '../../../../redux/settings-selector'
import { AppStateType } from '../../../../redux/store'

export const HistoryPopup: FC<{setIsHistoryShown: (isHistoryShown: boolean) => void}> = React.memo(({
  setIsHistoryShown
}) => {
  const dispatch = useDispatch()
  const history = useSelector((state: AppStateType) => state.gamePage.history.reverse())
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  
  const onCloseClick = () => {
    setIsHistoryShown(false)
    if(gameStatus === 'process')
      dispatch(settingsActions.setTimeSpeed(timeSpeed))
  }

  return (
    <div className="historyPopup">
      <div className="historyPopupBlock">
        <div className="historyPopupBlock__Title">
          История покупок / продаж
        </div>
        <div className="historyPopupBlock__Close" onClick={onCloseClick}>
          <CloseOutlined/>
        </div>
        {history.length > 0
          ? <div className="historyPopupBlock__List">
              {history.map((h, i) => {
                return (
                  <div className="historyPopupBlock__ListItem" key={i}>
                    <div className="historyPopupBlock__ListItem__Title">
                      <i>{h.title}</i>  
                    </div>
                    <div 
                      className="historyPopupBlock__ListItem__Operation" 
                      style={h.operationType === 'buy' ? {color: 'green'} : {color: '#f36f38'}}
                    >
                      {h.operationType === 'buy' 
                      ? 'Покупка'
                      : 'Продажа'
                      }
                      <div className="historyPopupBlock__ListItem__OperationBlock">
                        <div className="historyPopupBlock__ListItem__OperationAmount">{h.amount} шт.</div>
                        <div className="historyPopupBlock__ListItem__OperationPrice">${h.price}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          : <h2>Вы не купили ни одного актива</h2>
        }
      </div>
    </div>
  )
})