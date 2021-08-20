import { NavLink } from "react-router-dom";
import React, { FC } from "react";
import {useSelector} from "react-redux";
import {getPersonSelector} from "../../redux/profile-selector";

export const MenuPage: FC = (props) => {

  const person = useSelector(getPersonSelector)


  return (
    <>
        <div className='menu bannerBack'>
          <div className="menuGameName">
            <span>#ЯИнвестор</span>
          </div>
          <div className="menuContent">
            <div className="menuHeader">
              МЕНЮ
            </div>
            <div className="menuList">
              <div className="menuListItem">
                <NavLink to='/profile'>
                  <button className='menuListItem__Button'>
                    Начать игру
                  </button>
                </NavLink>
              </div>
              <div className="menuListItem">
                <NavLink to='/game'>
                  <button className='menuListItem__Button' disabled={true}>
                    Достижения
                  </button>
                </NavLink>
              </div>
              <div className="menuListItem">
                <NavLink to='/game'>
                  <button className='menuListItem__Button' disabled={true}>
                    Статистика
                  </button>
                </NavLink>
              </div>
              <div className="menuListItem">
                <NavLink to='/settings'>
                  <button className='menuListItem__Button'>
                    Настройки
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="person">
              {person ? person.name : 'выберете персонажа!'}
            </div>
          </div>
        </div>
    </>
  )
}