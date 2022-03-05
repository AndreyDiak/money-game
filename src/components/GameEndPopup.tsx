import React, { FC } from "react"
import { useSelector } from 'react-redux'
import { AppStateType } from "../redux/store"

export const GameEndPopup: FC = React.memo(() => {

  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)

  return (
    <>
      <div className="endPopup">
        <div className="endPopupBlock">
          <div className="endPopupBlock__Title">
            {gameStatus === 'lose' ? 'Увы, вы проиграли!' : 'Поздравляем, вы прошли игру!'}
          </div>
          <div className="endPopupBlock__Close">
            
          </div>
          <div className="endPopupBlock__About">
            {gameStatus === 'lose' ? '' : ''}
          </div>
          <div className="endPopupBlock__History">
            (обновите страницу)
          </div>
        </div>
      </div>
    </>
  )
})