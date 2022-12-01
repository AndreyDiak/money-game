import {NavLink} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {logoutThunk, setCurrentGameThunk} from "../../redux/app-reducer";
import {useHttp} from "../../hooks/http.hook";

const MenuPage = () => {

  const dispatch = useDispatch()

  // пройдено ли обучение . . .
  const {request, isLoading} = useHttp()
  const token = useSelector((state: AppStateType) => state.app.token)
  const [isGameExist, setIsGameExist] = useState(false)
  const [currentGame, setCurrentGame] = useState(null)
  const info = () => {
    message.warning('Эта функция пока не доступна(')
  }

  const requestGame = useCallback(async () => {
    try {
      const data = await request('/api/game/', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      console.log(data)
      if (data.day > 10) {
        setIsGameExist(true)
        setCurrentGame(data)
      }
    } catch (e) {
      // если пользователь не авторизован то мы удаляем данные о токене из локального кэша . . .
      dispatch(logoutThunk())
    }
  }, [])

  const continueGame = () => {
    dispatch(setCurrentGameThunk(currentGame))
  }

  useEffect(() => {
    requestGame()
  }, [])

  if(isLoading) {
    return (
      <>loading...</>
    )
  }

  return (
    <>
        <div className='menu bannerBack'>
          <div className="menuGameName">
            <span>#ЯИнвестор</span>
            <div><small>ВЕРСИЯ 2.9.0</small></div>
          </div>
          <div className="menuContent">
            <div className="menuHeader">
              МЕНЮ
            </div>
            <div className="menuList">
              {isGameExist
                &&
                <div className="menuListItem">
                  <NavLink to='/game'>
                    <button className='menuListItem__Button' onClick={() => continueGame()}>
                      Продолжить игру
                    </button>
                  </NavLink>
                </div>
              }
              <div className="menuListItem">
                <NavLink to='/select'>
                  <button className='menuListItem__Button'>
                    Начать игру
                  </button>
                </NavLink>
              </div>
              {/*<div className="menuListItem">*/}
              {/*  <button className="menuListItem__Button" onClick={showChangesModal}>*/}
              {/*    Список изменений*/}
              {/*  </button>*/}
              {/*</div>*/}
              {/*<div className="menuListItem">*/}
              {/*  /!*<NavLink to='/game'>*!/*/}
              {/*  /!*  <button className='menuListItem__Button'>*!/*/}
              {/*  /!*    Достижения*!/*/}
              {/*  /!*  </button>*!/*/}
              {/*  /!*</NavLink>*!/*/}
              {/*  <button className="menuListItem__Button" onClick={info}>*/}
              {/*    Достижения*/}
              {/*  </button>*/}
              {/*</div>*/}
              {/* <div className="menuListItem">
                <NavLink to='/user'>
                  <button className='menuListItem__Button'>
                    Профиль
                  </button>
                </NavLink>
              </div> */}
              {/*<div className="menuListItem">*/}
              {/*  <NavLink to='/settings'>*/}
              {/*    <button className='menuListItem__Button'>*/}
              {/*      Настройки*/}
              {/*    </button>*/}
              {/*  </NavLink>*/}
              {/*</div>*/}
              <div className="menuListItem">
                <button className='menuListItem__Button' onClick={() => dispatch(logoutThunk())}>
                  Выход
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default MenuPage;