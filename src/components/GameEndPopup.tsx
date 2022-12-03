import { Button } from "antd"
import React, { FC } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { setPopupsShownThunk } from "../redux/game-reducer"
import { AppStateType } from "../redux/store"

export const GameEndPopup: FC = React.memo(() => {

  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  const dispatch = useDispatch()

  const onButtonClick = () => {
    dispatch(setPopupsShownThunk('history', true))
  }

  return (
    <>
      <div className="endPopup">
        <div className="endPopupBlock">
          <div className="endPopupBlock__Title">
            {gameStatus === 'lose' ? 'Увы, вы проиграли!' : 'Поздравляем, вы прошли игру!'}
          </div>
          <div className="endPopupBlock__About">
            {gameStatus === 'lose' ? '' : ''}
            Денег потрачено: х
          </div>
          <div className="endPopupBlock__Bottom">
            <div className="endPopupBlock__BottomMenu">
              <NavLink to='/menu'>
                <Button>Выйти в меню</Button>
              </NavLink>
            </div>
            <div className="endPopupBlock__BottomHistory">
              <Button onClick={onButtonClick}>История</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})