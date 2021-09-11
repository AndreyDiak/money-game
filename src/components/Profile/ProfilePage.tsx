import {FC, useEffect, useState} from "react"
import {Avatar, Button} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {personType, profileActions, updateIncome} from "../../redux/profile-reducer";
import {actions} from "../../redux/game-reducer";
import {NavLink} from "react-router-dom";
import Radio from "antd/lib/radio";
import {getDifficultySelector, getTimeSpeedSelector} from "../../redux/settings-selector";
import {settingsActions} from "../../redux/settings-reducer";
import {spendsActions} from "../../redux/spends-reducer";

export const ProfilePage: FC = () => {

  const dispatch = useDispatch()
  const timeSpeed = useSelector(getTimeSpeedSelector)
  const difficulty = useSelector(getDifficultySelector)
  const victoryBalance = useSelector((state: AppStateType) => state.gamePage.victoryBalance)
  const persons = useSelector((state: AppStateType) => state.profilePage.persons)
  const [activePerson, setActivePerson] = useState(0)

  const [filteredPersons, setFilteredPersons] = useState(persons.filter(f => f.difficulty === 'easy'))

  // выбор скорости игры
  const timesSpeed = [8, 4, 2]

  // расчёт подоходного налога / зависит на прямую от зп
  const tax = filteredPersons[activePerson].salary >= 500
    ? filteredPersons[activePerson].salary * 0.15
    : filteredPersons[activePerson].salary * 0.10

  let taxesSummary = tax

  filteredPersons[activePerson].expenses.forEach(expense => {
    taxesSummary += expense.startPrice * expense.payment / 100
  })

  const setProfile = () => {
    const profile = filteredPersons[activePerson]

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
  // const optionsDifficulty = [
  //   { label: 'Легко', value: 'легко' },
  //   { label: 'Средне', value: 'средне' },
  //   { label: 'Сложно', value: 'сложно' },
  // ]
  const optionsVictoryBalance = [
    { label: '5.000$', value: 5000 },
    { label: '15.000$', value: 15000 },
    { label: '50.000$', value: 50000 },
  ]

  const onChangeTime = (e: any) => {
    dispatch(settingsActions.setTimeSpeed(e.target.value))
    dispatch(settingsActions.setConstTimeSpeed(e.target.value))
  }

  const onChangeVictoryBalance = (e: any) => {
    dispatch(actions.setVictoryBalance(e.target.value))
  }

  useEffect(() => {
    dispatch(spendsActions.setEventsPrice())
    // filteredPersons = persons.filter(f => f.difficulty === 'easy')
  },[, persons])

  console.log(filteredPersons)
  console.log(persons)

  let screenWidth = window.screen.width

  return (
    <>
      <div className="profile bannerBack">
        {screenWidth > 1200 && <div className="profilePreview">
          <div className="profilePreview__Title">
            <b>Ваш персонаж</b>
          </div>
          <div className="profilePreview__Name">
            {filteredPersons[activePerson].name}
            <div className="profilePreview__NameWork">
              ({filteredPersons[activePerson].work})
            </div>
          </div>
          <div className="profilePreview__Img">
            <img src={filteredPersons[activePerson].img} alt=""/>
          </div>
        </div>}
        <div className="profilePersons">
          <div className="profilePersons__Title">
            Доступные персонажи
          </div>
          <div className="profilePersons__Filter">
            <Button size={'large'} onClick={() => {
              setActivePerson(0)
              setFilteredPersons(persons.filter(f => f.difficulty === 'easy'))
            }}>Легкие</Button>
            <Button size={'large'} onClick={() => {
              setActivePerson(0)
              setFilteredPersons(persons.filter(f => f.difficulty === 'normal'))
            }}>Нормальные</Button>
            <Button size={'large'} onClick={() => {
              setActivePerson(0)
              setFilteredPersons(persons.filter(f => f.difficulty === 'hard'))
            }}>Сложные</Button>
          </div>
          <div className="profilePersons__Blocks">
            {filteredPersons.length === 0
            ? 'загрузка'
            : <>
                {filteredPersons.map((person, index) => {
                  return (
                    <>
                      <div className="profilePersons__Block">
                        <button onClick={() => setActivePerson(index)} className='profilePersons__BlockImg' >
                          <Avatar src={person.avatar} size={100} style={activePerson === index ? {border: '2px solid crimson'} : {}}/>
                        </button>
                      </div>
                    </>
                  )
                })}
              </>
            }
          </div>
          <div className="profilePersons__Button">
            <NavLink to='/game'>
              <Button onClick={() => setProfile()}>
                Начать игру
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="profileMenu">
          <div className="profileMenu__Buttons">
            <div className="profileMenu__Button">
              <NavLink to='/'>
                <Button>
                  Вернутся в меню
                </Button>
              </NavLink>
            </div>
          </div>
          <div className="profileMenu__Settings">
            <div className="profileMenu__SettingsItem">
              Скорость игры
              <br/>
              <Radio.Group
                options={optionsTime}
                onChange={onChangeTime}
                value={timeSpeed}
                optionType="button"
                className='settingsListItem__Radio'
              />
            </div>
            {/*<div className="profileMenu__SettingsItem">*/}
            {/*  Сложность игры*/}
            {/*  <br/>*/}
            {/*  <Radio.Group*/}
            {/*    options={optionsDifficulty}*/}
            {/*    onChange={onChangeDifficulty}*/}
            {/*    value={difficulty}*/}
            {/*    optionType="button"*/}
            {/*    className='settingsListItem__Radio'*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="profileMenu__SettingsItem">
              Доход / мес
              <br/>
              <Radio.Group
                options={optionsVictoryBalance}
                onChange={onChangeVictoryBalance}
                value={victoryBalance}
                optionType="button"
                className='settingsListItem__Radio'
              />
            </div>
          </div>
          <div className="profileMenu__Stats">
            <div className='profileMenu__StatsIncome'>
              <div className="profileMenu__StatsTitle">
                Доходы
              </div>
              <div className="profileMenu__StatsBlock">
                <div className="profileMenu__StatsBlock__Title">Зарплата:</div>
                <div className="profileMenu__StatsBlock__Price">${filteredPersons[activePerson].salary}</div>
              </div>
              <div className="profileMenu__StatsBlock">
                <div className="profileMenu__StatsBlock__Title">Сбережения:</div>
                <div className="profileMenu__StatsBlock__Price">${filteredPersons[activePerson].saving}</div>
              </div>
            </div>
            <div className='profileMenu__StatsExpenses'>
              <div className="profileMenu__StatsTitle">
                Расходы
              </div>
              <div className="profileMenu__StatsBlock">
                <div className="profileMenu__StatsBlock__Title">Налог:</div>
                <div className="profileMenu__StatsBlock__Price">${tax}</div>
              </div>
              {filteredPersons[activePerson].expenses.map((expense, index) => {
                return (
                  <>
                    {expense.remainPrice !== 0
                      ? <div className='profileMenu__StatsBlock'>
                          <div className="profileMenu__StatsBlock__Title">{expense.title}:</div>
                          <div className="profileMenu__StatsBlock__Price">${expense.remainPrice * expense.payment / 100}</div>
                        </div>
                      : ''}
                  </>
                )
              })}
            </div>
            <div className="profileMenu__StatsCash">
              <div className="profileMenu__StatsTitle">
                Наличные:
              </div>
              <div className="profileMenu__StatsBlock">
                ${filteredPersons[activePerson].salary - taxesSummary}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}