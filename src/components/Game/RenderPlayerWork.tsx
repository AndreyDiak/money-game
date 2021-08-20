import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {CSSProperties, FC, SetStateAction, useEffect, useState} from "react";
import {Work, WorkOptions, worksActions, WorksType} from "../../redux/work-reducer";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import {Button, Slider} from "antd";
import {getDaySelector, getIncomeSelector, getWalletSelector} from "../../redux/game-selector";
import {getDifficultySelector} from "../../redux/settings-selector";
import {actions} from "../../redux/game-reducer";
import {CloseOutlined} from "@ant-design/icons";

export const RenderPlayerWork: FC<{setIsChangeWorkShown: SetStateAction<any>}> = (props) => {

  const dispatch = useDispatch()
  // зп
  const income = useSelector(getIncomeSelector)
  // виды работы . . .
  const works = useSelector((state: AppStateType) => state.worksPage.works)
  // наша работа . . .
  const currentWork = useSelector((state: AppStateType) => state.worksPage.currentWork) as Work
  // текущий день . . .
  const day = useSelector(getDaySelector)
  // баланс
  const wallet = useSelector(getWalletSelector)
  // показываем ли мы шанс на успех повышения . . .
  const [isChanceVisible, setIsChanceVisible] = useState(false)
  // сложность игры . . .
  const difficulty = useSelector(getDifficultySelector)
  // дней до запроса на повышение . . .
  const [daysToTry, setDaysToTry] = useState(0)
  // шанс повышения от сложности . . .
  let chanceConst: number

  switch (difficulty) {
    case "легко":
      chanceConst = 0.20
      break
    case "средне":
      chanceConst = 0.15
      break
    case "сложно":
      chanceConst = 0.10
      break
  }
  // полный шанс повышения . . .
  const [chanceToUp, setChanceToUp] = useState(chanceConst)
  // дней до повышения . . .
  const daysToUp = currentWork.options[currentWork.level - 1].daysToUp - currentWork.daysWorked

  // увеличиваем количество проработанных дней и дней до запроса повышения . . .
  useEffect(() => {
    dispatch(worksActions.setDaysWorked(currentWork.daysWorked + 1))
    setDaysToTry((days) => days + 1)
  },[day])

  useEffect(() => {
    // повышение в работе при условии выслуги лет . . .
    if(daysToUp === 0 && currentWork.level < 4) {
      updateWorkStats()
    }
    // шанс повышения в зависимости от кол-ва проработанных дней . . .
    let chance: number = Number(((currentWork.daysWorked / (2 * currentWork.options[currentWork.level - 1].daysToUp))).toFixed(1))
    setChanceToUp(Number((chanceConst + chance).toFixed(2)))
  },[daysToUp])

  // повышение работы, при успехе переходим на новый уровень, при неудаче даем дебафы . . .
  const upWork = () => {
    // шанс повышения
    const chance = Math.random()
    if(chance <= chanceToUp) {
      updateWorkStats()
    } else {
      dispatch(worksActions.setDaysWorked(0))
      setDaysToTry(0)
      dispatch(actions.setWallet(wallet - 100 - currentWork.options[currentWork.level - 1].income * 5))
    }
  }
  // обновляем данные по работе после повышения
  const updateWorkStats = () => {
    console.log(Number((currentWork.options[currentWork.level - 1].income * currentWork.startSalary / 100).toFixed(1)))
    dispatch(actions.setIncome(income + Number((currentWork.options[currentWork.level - 1].income * currentWork.startSalary / 100).toFixed(1))))
    dispatch(worksActions.setDaysWorked(0))
    dispatch(worksActions.setWorkLevel(currentWork.level + 1))
  }
  // смена работы . . .
  return (
    <>
      <div className="gameWork bannerBack">
        <div className="gameWork__current">
          <div className="gameWork__currentButton">
            <Button onClick={() => props.setIsChangeWorkShown(true)}>
              Сменить работу
            </Button>
          </div>
          <div className="gameWork__currentTitle">
            Вы проработали - <b>{currentWork.daysWorked} дней</b>
          </div>
          <div className="gameWork__currentTitle">
            Ваш уровень - <b>{currentWork.options[currentWork.level - 1].level}</b>
          </div>
          {currentWork.level < 4
            ?
              <>
                <div className="gameWork__currentTitle">
                  Дней до повышения - {daysToUp}
                </div>
                {daysToTry >= 20
                ?
                  <>
                    <div>
                      <button
                        className="gameWork__currentAsk"
                        onMouseOver={() => setIsChanceVisible(true)}
                        onMouseOut={() => setIsChanceVisible(false)}
                        onClick={() => upWork()}
                      >
                        Попросить повышение
                      </button>
                      {isChanceVisible ? `   шанс: ${chanceToUp}` : ''}
                    </div>
                  </> : <div>
                    Можно сделать запрос через {20 - daysToTry} дней
                  </div>}
              </>
            : ''
          }

        </div>
        <div className="gameWork__types">
          <div className="gameWork__typesTitle">
            Ветка развития
          </div>
          <div className="gameWork__typesContent">
            <div className="gameWork__typesBlocks" style={currentWork.type === 'it' ? {borderColor: '#fff'} : {}}>
              <div className="gameWork__typesBlockImg">
                <Avatar src={works.it.avatar} size={70} shape={"square"}/>
              </div>
              {works.it.options.map((workLevel, index) => <RenderWork workLevel={workLevel} index={index} type='it' key={index} /> )}
            </div>
            <div className="gameWork__typesBlocks" style={currentWork.type === 'manager' ? {borderColor: '#fff'} : {}}>
              <div className="gameWork__typesBlockImg">
                <Avatar src={works.manager.avatar} size={70} shape={"square"}/>
              </div>
              {works.manager.options.map((workLevel, index) => <RenderWork workLevel={workLevel} index={index} type='manager' key={index}/>)}
            </div>
            <div className="gameWork__typesBlocks" style={currentWork.type === 'engineer' ? {borderColor: '#fff'} : {}}>
              <div className="gameWork__typesBlockImg">
                <Avatar src={works.engineer.avatar} size={70} shape={"square"}/>
              </div>
              {works.engineer.options.map((workLevel, index) => <RenderWork workLevel={workLevel} index={index} type='engineer' key={index}/>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const RenderWork: FC<{workLevel: WorkOptions, index: number, type: WorksType}> = React.memo((props) => {

  const currentWork = useSelector((state: AppStateType) => state.worksPage.currentWork) as Work

  const styles: CSSProperties = {
    border: '1px solid #282c34',
    background:'rgba(255,255,255,0.9)',
    color: '#282c34'
  }

  return (
    <>
      <div className="gameWork__typesBlock" style={props.index === currentWork.level - 1 && currentWork.type === props.type ? styles : {}}>
        {props.index + 1}  {props.workLevel.title}
      </div>
    </>
  )
})

export const WorksChoicePopup:FC<{setIsChangeWorkShown: SetStateAction<any>}> = (props) => {

  const worksType = ['it', 'manager', 'engineer']
  const dispatch = useDispatch()

  const works = useSelector((state: AppStateType) => state.worksPage.works)
  const currentWork = useSelector((state: AppStateType) => state.worksPage.currentWork) as Work

  const setNewWork = (workType: WorksType) => {
    switch (workType) {
      case "it":
        dispatch(worksActions.setWork(works.it))
        break
      case "manager":
        dispatch(worksActions.setWork(works.manager))
        break
      case "engineer":
        dispatch(worksActions.setWork(works.engineer))
        break
    }
    props.setIsChangeWorkShown(false)
  }

  return (
    <>
      <div className="workChoicePopup">
        <div className="workChoicePopup__Block">
          <div className="workChoicePopup__BlockClose">
            <CloseOutlined onClick={() => props.setIsChangeWorkShown(false)}/>
          </div>
          <div className="workChoicePopup__BlockWorks">
              {currentWork.type !== 'it'
                ? <div className="workChoicePopup__BlockWork" onClick={() => setNewWork('it')}>
                    <Avatar src={works.it.avatar} size={170} shape={'square'} />
                  </div>
                : ''
              }
              {currentWork.type !== 'manager'
                ? <div className="workChoicePopup__BlockWork" onClick={() => setNewWork('manager')}>
                    <Avatar src={works.manager.avatar} size={170} shape={'square'} />
                  </div>
                : ''
              }
              {currentWork.type !== 'engineer'
                ? <div className="workChoicePopup__BlockWork" onClick={() => setNewWork('engineer')}>
                  <Avatar src={works.engineer.avatar} size={170} shape={'square'} />
                </div>
                : ''
              }
          </div>
        </div>
      </div>
    </>
  )
}