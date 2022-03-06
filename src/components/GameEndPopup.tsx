import { Button } from "antd"
import React, { FC } from "react"
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { AppStateType } from "../redux/store"

export const GameEndPopup: FC<{setIsHistoryShown: (isShown: boolean) => void}> = React.memo(({setIsHistoryShown}) => {

  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)

  return (
    <>
      <div className="endPopup">
        <div className="endPopupBlock">
          <div className="endPopupBlock__Title">
            {gameStatus === 'lose' ? 'Увы, вы проиграли!' : 'Поздравляем, вы прошли игру!'}
          </div>
          <div className="endPopupBlock__About">
            {gameStatus === 'lose' ? '' : ''}
          </div>
          <div className="endPopupBlock__Bottom">
            <div className="endPopupBlock__BottomMenu">
              <NavLink to='/menu'>
                <Button>Выйти в меню</Button>
              </NavLink>
            </div>
            <div className="endPopupBlock__BottomHistory">
              <Button onClick={() => setIsHistoryShown(true)}>История</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})