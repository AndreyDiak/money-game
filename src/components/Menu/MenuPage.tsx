import {NavLink} from "react-router-dom";
import React, {FC, useState} from "react";
import {Button, Checkbox, message, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {appActions} from "../../redux/app-reducer";
import { HeartTwoTone } from "@ant-design/icons";

export const MenuPage = () => {

  const dispatch = useDispatch()
  // открытие модального окна с обучением . . .
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChangeModalVisible, setIsChangeModalVisible] = useState(false)
  // пройдено ли обучение . . .
  const isInstructionCompleted = useSelector((state: AppStateType) => state.app.isInstructionCompleted)

  const info = () => {
    message.warning('Эта функция пока не доступна(')
  }

  const showModal = () => {
    setIsModalVisible(() => true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showChangesModal = () => {
    setIsChangeModalVisible(() => true)
  }
  const handleChangesOk = () => {
    setIsChangeModalVisible(false)
  }


  return (
    <>
        <div className='menu bannerBack'>
          <Modal className='menuModal' title="Обучение" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText='Продолжить' footer={[
            <>
              <Checkbox onChange={() => dispatch(appActions.setIsInstructionCompleted())}>Больше не показывать</Checkbox>
              <NavLink to='/profile'>
                <Button type='primary' onClick={handleOk}>
                  Продолжить
                </Button>
              </NavLink>
            </>
          ]}>
            <p><h3><b>Данный проект является симулятором инвестора</b></h3></p>
            <p>Ваша задача заработать <b>10000$</b> на светлое будещее, как вы это будете делать, зависит только от вас! <i>(если баланс будет меньше <b>нуля</b> то вы проиграли!)</i></p>
            <p>В игре есть несколько видов заработка</p>
            <ul>
              <li><b>Работа</b> (Доступно сразу)</li>
              <li><b>Акции</b> (Нужен баланс в <b>500$</b>)</li>
              <li><b>Свой бизнесс</b> (Нужен баланс в <b>3000$</b>)</li>
            </ul>
            <p>
              На ваш выбор есть несколько <b>персонажей</b>, у каждого свои предпочтения и стартовый <b>капитал</b> <i>(советуем внимательно выбирать работу, чтобы она подходила под вашего персонажа)</i>
            </p>
            <p>
              Каждую неделю ваш персонаж будет тратить определённую сумму на различные нужды.
              (Можно смотреть во вкладке <b><i>Затраты</i></b>)
            </p>
            <p>
              Каждые две недели будут появляться новости. (Вкладка <b><i>Новости</i></b>)
              <br/>
              Они могут влиять на:
              <ul>
                <li>
                  Доход или баланс <b>персонажа</b>
                </li>
                <li>
                  Резкий рост или падение <b>акций</b>
                </li>
                <li>
                  Увеличение или падение дохода от <b>бизнесса</b>
                </li>
              </ul>
            </p>
          </Modal>
          <Modal title='Изменения' visible={isChangeModalVisible} footer={[
            <>
              <NavLink to='/rofl'>
                <Button onClick={handleChangesOk}>
                  Не понял
                </Button>
              </NavLink>
              <Button type='primary' onClick={handleChangesOk}>
                Понял
              </Button>
            </>
          ]}>
            <ol>
              <li>При каждой новой игре лучше <b>перезагружать</b> страницу (мало-ли что)</li>
              <li>Новая система выбора <b>персонажей</b></li>
              <li>Новая сиситема <b>налогов</b> и <b>доходов</b> персонажа</li>
              <li>Макс кол-во детей - <b>3</b>, (теперь инфа по ним будет в профиле)</li>
              <li>Вместо вкладки работа, будет профиль где пишутся ваши <b>пассивные</b> и <b> активные</b> доходы а также работа и тд.</li>
              <li>Переработано окно <b>затрат</b>, добавлена их история</li>
              <li>Небольшой <b>редизайн</b> отдельных аспектов игры</li>
              <li>Все <b>баги</b> или <b>"фичи"</b> отправлять лучше мне в вк: <a href="https://vk.com/drunua">тык</a></li>
            </ol>
            <i>p.s. Спасибо всем тестерам <HeartTwoTone twoToneColor="#eb2f96" /></i>
          </Modal>
          <div className="menuGameName">
            <span>#ЯИнвестор</span>
            <div><small>ВЕРСИЯ 2.1.0</small></div>
          </div>
          <div className="menuContent">
            <div className="menuHeader">
              МЕНЮ
            </div>
            <div className="menuList">
              <div className="menuListItem">
                {isInstructionCompleted
                  ? <NavLink to='/profile'>
                      <button className='menuListItem__Button'>
                        Начать игру
                      </button>
                    </NavLink>
                  : <button className="menuListItem__Button" onClick={showModal} >
                      Начать игру
                    </button>
                }
              </div>
              <div className="menuListItem">
                <button className="menuListItem__Button" onClick={showChangesModal}>
                  Список изменений
                </button>
              </div>
              <div className="menuListItem">
                {/*<NavLink to='/game'>*/}
                {/*  <button className='menuListItem__Button'>*/}
                {/*    Достижения*/}
                {/*  </button>*/}
                {/*</NavLink>*/}
                <button className="menuListItem__Button" onClick={info}>
                  Достижения
                </button>
              </div>
              <div className="menuListItem">
                {/*<NavLink to='/game'>*/}
                {/*  <button className='menuListItem__Button' disabled={true}>*/}
                {/*    Статистика*/}
                {/*  </button>*/}
                {/*</NavLink>*/}
                <button className="menuListItem__Button" onClick={info}>
                  Статистика
                </button>
              </div>
              <div className="menuListItem">
                <NavLink to='/settings'>
                  <button className='menuListItem__Button'>
                    Настройки
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}