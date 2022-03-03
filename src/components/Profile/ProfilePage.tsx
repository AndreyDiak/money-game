import React, {FC, useEffect, useState} from "react"
import {Avatar, Button} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {profileActions, updateIncome} from "../../redux/profile-reducer";
import {actions, DifficultyType} from "../../redux/game-reducer";
import {NavLink} from "react-router-dom";
import Radio, { RadioGroupContextProps } from "antd/lib/radio";
import {getDifficultySelector, getTimeSpeedSelector} from "../../redux/settings-selector";
import {settingsActions} from "../../redux/settings-reducer";
import {spendsActions} from "../../redux/spends-reducer";
import {useHttp} from "../../hooks/http.hook";

export const ProfilePage: FC = () => {

  const {request} = useHttp()
  const token = useSelector((state: AppStateType) => state.app.token)

  const dispatch = useDispatch()
  const timeSpeed = useSelector(getTimeSpeedSelector)
  // const difficulty = useSelector(getDifficultySelector)
  const victoryBalance = useSelector((state: AppStateType) => state.gamePage.victoryBalance)
  const persons = useSelector((state: AppStateType) => state.profilePage.persons)
  const [activePerson, setActivePerson] = useState(0)
  const about = [
    'Быстрая игра, хорошо подходит для ознакомления с игрой, доступен только рынок акций, для победы добейтесь дохода в 5000$',
    'Нормальная игры, подходит для тех кто изучил основные принципы игры и хочет попробовать что-то новенькое, доступен рынок акций и рынок недвижимости, для победы добейтесь дохода в 15000$',
    'Долгая игра, пройдите суровую проверку своих навыков, все рынки доступны, для победы добейтесь дохода в 50000$',
  ]

  const [filteredPersons, setFilteredPersons] = useState(persons.filter(f => f.difficulty === 'easy'))
  const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0)
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  // выбор скорости игры
  const timesSpeed = [8, 4, 2]

  // расчёт подоходного налога / зависит на прямую от зп
  const tax = filteredPersons[activePerson].salary >= 500
    ? filteredPersons[activePerson].salary * 0.15 // на зп более 100$ повышенный налог...
    : filteredPersons[activePerson].salary * 0.10

  let taxesSummary = filteredPersons[activePerson].expenses.reduce((acc, next) => {
    return acc + next.startPrice * next.payment / 100
  }, tax)
  
  const updateStats = async (profile: any) => {
    try {
      // const data = await request('/api/profile/new', 'POST', {profile},{
      //   Authorization: `Bearer ${token}`
      // })

    } catch (e) {}
  }

  const setProfile = async () => {

    const profile = filteredPersons[activePerson]

    // await updateStats(profile)

    dispatch(profileActions.setProfile(profile))
    // устанавливаем подоходный налог на зп
    dispatch(profileActions.setTax(tax))
    // устанавливаем долги персонажа
    // dispatch(profileActions.setExpenses(persons[activePerson].expenses))
    // стартовый баланс
    dispatch(actions.setWallet(profile.saving))

    dispatch(updateIncome())
    // dispatch(actions.setIncome(persons[activePerson].salary - taxesSummary))
  }

  const optionsTime = [
    { label: 'день/4сек', value: timesSpeed[0] },
    { label: 'день/2сек', value: timesSpeed[1] },
    { label: 'день/1сек', value: timesSpeed[2] },
  ]
  
  const gameDifficulty = [
    { label: 'Легко', value: 0 },
    { label: 'Средне', value: 1 },
    { label: 'Сложно', value: 2 },
  ]

  const onChangeTime = (e: any) => {
    dispatch(settingsActions.setTimeSpeed(e.target.value))
    dispatch(settingsActions.setConstTimeSpeed(e.target.value))
  }

  const onChangeDifficulty = (e: any) => {
    setDifficulty(e.target.value)
    let [filter, balance] = e.target.value === 0 ? ['easy', 5000] : e.target.value === 1 ? ['normal', 15000] : ['hard', 50000]
    dispatch(actions.setVictoryBalance(balance))
    dispatch(actions.setDifficulty(filter as DifficultyType))
    setActivePerson(0)
    setFilteredPersons(persons.filter(f => f.difficulty === filter))
  }

  useEffect(() => {
    dispatch(spendsActions.setEventsPrice())
  },[,persons])

  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [window.screen.width])
  return (
    <>
      <div className="profile bannerBack">
        <div className="profileBack">
          <NavLink to='/'>
            <Button>Обратно в меню</Button>
          </NavLink>
        </div>

        <div className="profileMenu">
          <div className="profileMenuTitle">Выбор персонажа</div>
          <div className="profileMenuList">
            <div className="profileMenuList__items">
              {filteredPersons.length === 0
                ? 'загрузка'
                : <>
                  {filteredPersons.map((person, index) => {
                    return (
                      <>
                        <div className="profileMenuList__item" key={index}>
                          <button onClick={() => setActivePerson(index)} className='profileMenuList__itemImg' >
                            <Avatar src={person.avatar} size={100} style={activePerson === index ? {border: '2px solid crimson'} : {}}/>
                          </button>
                        </div>
                      </>
                    )
                  })}
                </>
              }
            </div>
          </div> 
        </div>
        <div className="profilePreview">
          <div className="profilePreview__Name">
            {filteredPersons[activePerson].name}
            <div className="profilePreview__NameWork">
              ({filteredPersons[activePerson].work})
            </div>
          </div>
          <div className="profilePreview__Img">
            <img src={filteredPersons[activePerson].img} alt=""/>
          </div>
          <div className="profilePreview__Stats">
            <div className='profilePreview__StatsIncome'>
              <div className="profilePreview__StatsTitle">
                Доходы
              </div>
              <div className="profilePreview__StatsBlock">
                <div className="profilePreview__StatsBlock__Title">Зарплата:</div>
                <div className="profilePreview__StatsBlock__Price">${filteredPersons[activePerson].salary}</div>
              </div>
              <div className="profilePreview__StatsBlock">
                <div className="profilePreview__StatsBlock__Title">Остаток:</div>
                <div className="profilePreview__StatsBlock__Price">${filteredPersons[activePerson].salary - taxesSummary}</div>
              </div>
            </div>
            <div className='profilePreview__StatsExpenses'>
              <div className="profilePreview__StatsTitle">
                Расходы
              </div>
              <div className="profilePreview__StatsBlock">
                <div className="profilePreview__StatsBlock__Title">Налог:</div>
                <div className="profilePreview__StatsBlock__Price">${tax}</div>
              </div>
              {filteredPersons[activePerson].expenses.map((expense, index) => {
                return (
                  <>
                    {expense.remainPrice !== 0
                      ? <div className='profilePreview__StatsBlock' key={index}>
                          <div className="profilePreview__StatsBlock__Title">{expense.title}:</div>
                          <div className="profilePreview__StatsBlock__Price">${expense.remainPrice * expense.payment / 100}</div>
                        </div>
                      : ''}
                  </>
                )
              })}
            </div>
            <div className="profilePreview__StatsCash">
              <div className="profilePreview__StatsTitle">
                Наличные:
              </div>
              <div className="profilePreview__StatsBlock">
                ${filteredPersons[activePerson].saving}
              </div>
            </div>
          </div>
        </div>
        <div className="profileSettings">
          <div className="profileSettings__Speed">
            Скорость игры
            <br/>
            <Radio.Group
              options={optionsTime}
              onChange={onChangeTime}
              value={timeSpeed}
              optionType="button"                
              className='profileSettings__SpeedRadio'
            />
          </div>
          <div className="profileSettings__Condition">
            Сложность
            <br/>
            <Radio.Group
              options={gameDifficulty}
              onChange={onChangeDifficulty}
              value={difficulty}
              optionType="button"
              className='settingsListItem__Radio'
            />
            <br />
            <div className="profileSettings__ConditionAbout">
              {about[difficulty]}
            </div>
          </div>
          <div className="profileSettings__Button">
            <NavLink to='/game'>
              <Button size="large" onClick={setProfile}>Начать игру</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}