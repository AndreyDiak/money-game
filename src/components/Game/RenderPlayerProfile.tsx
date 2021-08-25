import {Avatar, message, Progress, Slider} from "antd";
import React, {FC} from "react";
import {RenderTime} from "./RenderTime";
import {useDispatch, useSelector} from "react-redux";
import {getPersonSelector} from "../../redux/profile-selector";
import {personType} from "../../redux/profile-reducer";
import {DoubleRightOutlined, PauseOutlined, RightOutlined } from "@ant-design/icons/lib/icons";
import {getLevelSelector, getVictoryBalance} from "../../redux/game-selector";
import Radio from "antd/lib/radio";
import {settingsActions} from "../../redux/settings-reducer";
import {getConstTimeSpeedSelector, getTimeSpeedSelector} from "../../redux/settings-selector";
import {AppStateType} from "../../redux/store";
import { Work } from "../../redux/work-reducer";

type RenderPlayerProfileType = {
  wallet: number
  income: number
}

export const RenderPlayerProfile: FC<RenderPlayerProfileType> = (props) => {

  const dispatch = useDispatch()
  // персонаж игрока
  const profile = useSelector(getPersonSelector) as personType
  // работа игрока
  const work = useSelector((state: AppStateType) => state.worksPage.currentWork) as Work
  // уровень игрока
  const level = useSelector(getLevelSelector)
  // нынешняя скорость игры
  const time = useSelector(getTimeSpeedSelector)
  // скорость установленная в начале игры / д.4с / д.2с / д.1с
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  // баланс необходимый для победы . . .
  const victoryBalance = useSelector(getVictoryBalance)

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
          <button className="gameProfileStats__MenuItem" style={time === 0 ? {color: '#fff'} : {}} onClick={() => onChangeTime(0)}>
            <PauseOutlined />
          </button>
          <button className="gameProfileStats__MenuItem" style={time === timeSpeed ? {color: '#fff'} : {}} onClick={() => onChangeTime(timeSpeed)}>
            <RightOutlined />
          </button>
          <button className="gameProfileStats__MenuItem" style={time === timeSpeed / 2 ? {color: '#fff'} : {}} onClick={() => onChangeTime(timeSpeed / 2)}>
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
              {work.options[work.level - 1].title}
            </div>
            <div className="gameProfileContent__WorkStats__Income">
              доход -  <span className="gold">{props.income}</span>
            </div>
          </div>
          <div className="gameProfileContent__WorkImg">
            <img src={work.avatar} alt=""/>
          </div>
        </div>
        <div className="gameProfileContent__Img">
          <img src={profile.img} alt=""/>
        </div>
      </div>
      <div className="gameProfileProgress">
        <RenderTime income={props.income} wallet={props.wallet}/>
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