import {Avatar, Dropdown, Menu, Progress} from 'antd'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPersonSelector} from "../redux/profile-selector";
import React, { FC } from "react";
import {personType} from "../redux/profile-reducer";
import {settingsActions} from "../redux/settings-reducer";
import {DoubleRightOutlined, PauseOutlined, RightOutlined} from "@ant-design/icons/lib/icons";
import {getConstTimeSpeedSelector, getTimeSpeedSelector} from "../redux/settings-selector";
import {getWalletSelector} from "../redux/game-selector";
import {RenderTime} from "./Game/RenderTime";
const { SubMenu } = Menu

export const Navbar: FC<{isEndOfGame: boolean}> = ({isEndOfGame}) => {

  const dispatch = useDispatch()

  const profile = useSelector(getPersonSelector) as personType
  //
  const time = useSelector(getTimeSpeedSelector)
  // скорость установленная в начале игры / д.4с / д.2с / д.1с
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  //
  const wallet = useSelector(getWalletSelector)
  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to='/game/market/stocks'>
          Акции
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to='/game/market/realty'>
          Недвижимость
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to='/game/market/business'>
          Бизнес
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="navWrapper">
        <div className="navItem">
          <div className="navItemProfile">
            <Progress
              width={58}
              strokeWidth={7}
              type="circle"
              percent={20}
              strokeColor={'rgb(16, 153, 209'}
              trailColor={'#282c34'}
              format={() => <Avatar src={profile.avatar} size={50}/> }
            />
            {profile.name}
            <RenderTime wallet={wallet}/>
          </div>
        </div>
        <div className="navItem">
          <div className="navItem__link">
            <NavLink to='/game/news'>
              Новости
            </NavLink>
          </div>
          <div className="navItem__link">
            <NavLink to='/game/spends'>
              Траты
            </NavLink>
          </div>
          <div className="navItem__link">
            <NavLink to='/game/profile'>
              Профиль
            </NavLink>
          </div>
          <div className="navItem__link">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Рынок
              </a>
            </Dropdown>
          </div>
          <div className="navItem__link">
            <NavLink to='/game/bank'>
              Банк
            </NavLink>
          </div>
        </div>
        <div className="navItem">
          <div className="navItemMenu">
            <button
              className="navItemMenu__block"
              style={time === 0 ? {color: '#fff'} : {}}
              onClick={() => onChangeTime(0)}
              disabled={isEndOfGame}>
              <PauseOutlined />
            </button>
            <button
              className="navItemMenu__block"
              style={time === timeSpeed ? {color: '#fff'} : {}}
              onClick={() => onChangeTime(timeSpeed)}
              disabled={isEndOfGame}>
              <RightOutlined />
            </button>
            <button
              className="navItemMenu__block"
              style={time === timeSpeed / 2 ? {color: '#fff'} : {}}
              onClick={() => onChangeTime(timeSpeed / 2)}
              disabled={isEndOfGame}>
              <DoubleRightOutlined />
            </button>
          </div>
          <div className="navItemBalance">
            <span className="gold">
              ${wallet}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}