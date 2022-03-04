import { FC } from "react"
import { GameStatusType } from "../redux/game-reducer"

export const GameEndPopup: FC<{status: GameStatusType}> = ({status}) => {
  return (
    <>
      <div className="endPopup">
        <div className="endPopupBlock">
          <div className="endPopupBlock__Title">
            {status === 'lose' ? 'Увы, вы проиграли!' : 'Поздравляем, вы прошли игру!'}
          </div>
          <div className="endPopupBlock__Close">
            
          </div>
          <div className="endPopupBlock__About">
            {status === 'lose' ? '' : ''}
          </div>
          <div className="endPopupBlock__History">
            
          </div>
        </div>
      </div>
    </>
  )
}