import { DoubleRightOutlined, PauseOutlined, RightOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Badge, Progress } from 'antd';
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getWalletSelector } from "../redux/game-selector";
import { personType } from "../redux/profile-reducer";
import { getPersonSelector } from "../redux/profile-selector";
import { settingsActions } from "../redux/settings-reducer";
import { getConstTimeSpeedSelector, getTimeSpeedSelector } from "../redux/settings-selector";
import { AppStateType } from "../redux/store";
import { RenderTime } from "./game/RenderTime";

const Navbar: FC = React.memo(() => {

  const dispatch = useDispatch()

  const profile = useSelector(getPersonSelector) as personType
  //
  const time = useSelector(getTimeSpeedSelector)
  // скорость установленная в начале игры / д.4с / д.2с / д.1с
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  //
  const wallet = useSelector(getWalletSelector)
  //
  const news = useSelector((state: AppStateType) => state.newsPage.news)
  //
  const gameStatus = useSelector((state: AppStateType) => state.gamePage.gameStatus)
  //
  const isEndOfGame = !(gameStatus === 'process') // if game in progress - false
  // 
  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

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
          </div>
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
        </div>
        <div className="navItem">
          <div className="navItem__link">
            <NavLink to='/game/spends'>
              Расходы
            </NavLink>
          </div>
          <div className="navItem__link">
            <NavLink to='/game/market'>
              Биржа
            </NavLink>
          </div>
          <div className="navItem__link">
            <NavLink to='/game/profile'>
              Профиль
            </NavLink>
          </div>
          
          <div className="navItem__link">
            <NavLink to='/game/bank' >
              Банк
            </NavLink>
          </div>
          <div className="navItem__link" >
            <Badge count={news.length} overflowCount={10}>
              <NavLink to='/game/news'>
                Новости
              </NavLink>
            </Badge>
          </div>
        </div>
        <div className="navItem">
          <RenderTime wallet={wallet}/>
          <div className="navItemBalance">
            <span className="gold">
              ${wallet}
            </span>
          </div>
        </div>
      </div>
    </>
  )
})

export default Navbar