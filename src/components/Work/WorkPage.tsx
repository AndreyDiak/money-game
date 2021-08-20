import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Avatar} from "antd";
import {ReturnBackButton} from "../common/ReturnBackButton";
import {FC, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {RightSquareOutlined} from "@ant-design/icons/lib/icons";
import {Work, worksActions, WorksType} from "../../redux/work-reducer";
import {actions} from "../../redux/game-reducer";
import {getDifficultySelector} from "../../redux/settings-selector";

export const WorkPage = () => {

  useEffect(() => {
    // по дефолту выбираем работу в it
    setWork('it')
    // сетаем зп
    dispatch(worksActions.setSalary())
    // сетаем цены на траты, в зависимости от сложности игры . . .
    let difficultPrice = 0
    switch (difficulty) {
      case "легко":
        difficultPrice = -15
        break
      case "сложно":
        difficultPrice = 15
        break
      default:
        break
    }
    // console.log(difficultPrice)
    // console.log(difficulty)
    // если сложность лёгкая, то все цены на 15 меньше, если сложная то на 15 больше . . .
    dispatch(actions.setEventsPrice(difficultPrice))
  },[])

  const dispatch = useDispatch()
  const works = useSelector((state: AppStateType) => state.worksPage.works)
  const work = useSelector((state: AppStateType) => state.worksPage.currentWork) as Work
  const personPref = useSelector((state: AppStateType) => state.profilePage.profile?.preferences)
  const difficulty = useSelector(getDifficultySelector)

  const setWork = (type: WorksType) => {
    switch (type) {
      case "it":
        dispatch(worksActions.setWork(works.it))
        break

      case 'manager':
        dispatch(worksActions.setWork(works.manager))
        break

      case "engineer":
        dispatch(worksActions.setWork(works.engineer))
        break

      default:
        return null
    }
  }

  const ContinueButton: FC = () => {
    return (
      <div className="continue">
        <NavLink to='/game'>
          <button className="continueButton buttonNav">
            <RightSquareOutlined />
          </button>
        </NavLink>
      </div>
    )
  }

  let texts = [
    {
      type: 'it',
      text: 'профессия скрупулёзных созидателей. Ни один проект в сфере информационных технологий не обходится ' +
        'без труда разработчика — программиста, который занимается созданием различных продуктов в ИТ: ' +
        'компьютерных игр, мобильных приложений, веб-сайтов и др'
    }, {
      type: 'manager',
      text: 'специалист, занятый организацией процессами на определённом участке предприятия, ' +
        'организации. Может быть её владельцем, но часто является наёмным работником. ' +
        'Менеджер, как правило, является должностным лицом в организации, в которой работает, '
    }, {
      type: 'engineer',
      text: 'специалист, осуществляющий инженерную деятельность. Инженеры вовлечены, как правило, во все процессы жизненного цикла ' +
        'технических устройств, являющихся предметом инженерного дела, ' + 'включая прикладные исследования, планирование, проектирование, '
    },
  ]

  return (
    <>
      {work
        ?
        <div className="workChoice bannerBack">
          <div className="workChoiceNav">
            <ReturnBackButton link='/profile'/>
            <ContinueButton />
          </div>
          <div className="workChoiceContent">
            <div className="workChoiceContent__List">
              <div className="workChoiceContent__ListHeader">
                Выбор работы
              </div>
              <div className="workChoiceContent__ListItems">
                <div
                  className="workChoiceContent__ListItem"
                  onClick={() => {setWork('it')}}
                >
                  <Avatar shape={"square"} size={150} src={works.it.avatar} style={work.type === 'it' ? {zIndex: 10} : {}} />
                </div>
                <div
                  className="workChoiceContent__ListItem"
                  onClick={() => {setWork('manager')}
                  }
                >
                  <Avatar shape={"square"} size={150} src={works.manager.avatar} style={work.type === 'manager' ? {zIndex: 10} : {}} />
                </div>
                <div
                  className="workChoiceContent__ListItem"
                  onClick={() => {setWork('engineer')}
                  }
                >
                  <Avatar shape={"square"} size={150} src={works.engineer.avatar} style={work.type === 'engineer' ? {zIndex: 10} : {}} />
                </div>
              </div>
              <div className="workChoiceContent__ListAbout">
                <div className="workChoiceContent__ListAbout__Header">
                  <b>{work.options[0].title}</b>
                </div>
                <div className="workChoiceContent__ListAbout__Content">
                  <div className="workChoiceContent__ListAbout__ContentSalary">
                    Зарплата -  <b>{work.startSalary} </b>
                    {personPref?.map((pref, index) => {
                      return (
                        <span key={index}>
                          {pref.type === work.type && pref.rise > 0
                            ? <>
                                <span className="workChoiceContent__ListAbout__ContentSalaryBonus">
                                  + {(pref.rise * work.startSalary / 100).toFixed(0)}
                                </span>
                              </>
                            : ''}
                        </span>
                      )
                    })}
                  </div>
                  <div className="workChoiceContent__ListAbout__ContentRise">
                    Перспектива роста - {personPref?.map((pref, index) => {

                      let riseColor = pref.rise < 3
                        ? 'red'
                        : `${pref.rise < 7 
                          ? '#ffc900' 
                          : '#35b924'
                        }`

                      return (
                        <span key={index}>
                          {work.type === pref.type
                            ? <span style={{color: riseColor}}>{pref.rise + 1}</span>
                            : ''}
                        </span>
                      )
                  })}
                  </div>
                  <div className="workChoiceContent__ListAbout__ContentText">
                    {
                      texts.map((text, index) => {
                        return (
                          <span key={index}>
                            {text.type === work.type
                              ? text.text
                              : ''
                            }
                          </span>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : ''}
    </>
  )
}