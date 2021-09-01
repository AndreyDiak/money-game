import {Avatar, message, Progress, Slider} from "antd";
import React, {FC} from "react";
import {RenderTime} from "./RenderTime";
import {useDispatch, useSelector} from "react-redux";
import {getExpensesSelector, getPersonSelector, getTaxSelector} from "../../redux/profile-selector";
import {personType} from "../../redux/profile-reducer";
import {DoubleRightOutlined, PauseOutlined, RightOutlined} from "@ant-design/icons/lib/icons";
import {getLevelSelector, getVictoryBalance} from "../../redux/game-selector";
import {settingsActions} from "../../redux/settings-reducer";
import {getConstTimeSpeedSelector, getTimeSpeedSelector} from "../../redux/settings-selector";

type RenderPlayerProfileType = {
  wallet: number
  isEndOfGame: boolean
}

export const RenderPlayerProfile: FC<RenderPlayerProfileType> = (props) => {

  const dispatch = useDispatch()
  // персонаж игрока
  const profile = useSelector(getPersonSelector) as personType
  // работа игрока
  const tax = useSelector(getTaxSelector)

  const expenses = useSelector(getExpensesSelector)
  // уровень игрока
  const level = useSelector(getLevelSelector)
  // нынешняя скорость игры
  const time = useSelector(getTimeSpeedSelector)
  // скорость установленная в начале игры / д.4с / д.2с / д.1с
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  // баланс необходимый для победы . . .
  const victoryBalance = useSelector(getVictoryBalance)

  let expensesSummary = 0

  expenses.forEach((expense, index) => {
    if(profile.expenses[index].price !== 0) {
      expensesSummary += expense.payment * expense.price / 100
    }
  })
  // текущий доход персонажа
  const income = profile.salary - tax - expensesSummary

  const info = () => {
    message.warning('Эта функция пока не доступна(')
  }

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  let styleName = props.wallet > 1500
    ? `${props.wallet > 3000
      ? 'profile-top' : 'profile-medium'}`
    : 'profile-start'

  return (
    <>
      <div className="gameProfileStats">
        <div className="gameProfileStats__Avatar">
          <div className="gameProfileStats__AvatarImg">
            <div className="gameProfileStats__AvatarImgPhoto">
              <Progress
                width={58}
                strokeWidth={7}
                type="circle"
                percent={20}
                strokeColor={'rgb(16, 153, 209'}
                trailColor={'#282c34'}
                format={() => <Avatar src={profile.avatar} size={50}/> }
              />
              <div className="gameProfileStats__AvatarImgLevel" onClick={info} onMouseOver={() => console.log('Сделать всплавашку про уровень')}>
                <b>{level}</b>
              </div>
            </div>
            <div className="gameProfileStats__AvatarImg__Name">
              {profile.name}
            </div>
          </div>
        </div>
        <div className="gameProfileStats__Menu">
          <button className="gameProfileStats__MenuItem" style={time === 0 ? {color: '#fff'} : {}} onClick={() => onChangeTime(0)} disabled={props.isEndOfGame}>
            <PauseOutlined />
          </button>
          <button className="gameProfileStats__MenuItem" style={time === timeSpeed ? {color: '#fff'} : {}} onClick={() => onChangeTime(timeSpeed)} disabled={props.isEndOfGame}>
            <RightOutlined />
          </button>
          <button className="gameProfileStats__MenuItem" style={time === timeSpeed / 2 ? {color: '#fff'} : {}} onClick={() => onChangeTime(timeSpeed / 2)} disabled={props.isEndOfGame}>
            <DoubleRightOutlined />
          </button>
        </div>
        <div className="gameProfileStats__Wallet">
          <b className='gold'>{props.wallet}</b>
        </div>
      </div>
      <div className={'gameProfileContent bannerBack ' + styleName}>
        <div className="gameProfileContent__Work">
          <div className="gameProfileContent__WorkStats">
            <div className="gameProfileContent__WorkStats__Level">
              {profile.work}
            </div>
            <div className="gameProfileContent__WorkStats__Income">
              доход - ${income}
            </div>
          </div>
          {/*<div className="gameProfileContent__WorkImg">*/}
          {/*  <img src={profile.avatar} alt=""/>*/}
          {/*</div>*/}
        </div>
        <div className="gameProfileContent__Img">
          <img src={profile.img} alt=""/>
        </div>
      </div>
      <div className="gameProfileProgress">
        <RenderTime wallet={props.wallet}/>
        <div className="gameProfileProgress__Title">
          Прогресс игры
        </div>
        <div className="gameProfileProgress__Slider">
          <Slider
            defaultValue={1}
            value={props.wallet}
            min={0}
            max={victoryBalance}
          />
        </div>
      </div>
    </>
  )
}