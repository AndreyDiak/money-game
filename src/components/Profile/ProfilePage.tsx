import {ReturnBackButton} from "../common/ReturnBackButton";
import {FC, SetStateAction, useState} from "react"
import {Carousel} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {personType, profileActions} from "../../redux/profile-reducer";
import {actions} from "../../redux/game-reducer";
import {NavLink} from "react-router-dom";
import {RightSquareOutlined} from "@ant-design/icons/lib/icons";

export const ProfilePage: FC = () => {

  const persons = useSelector((state: AppStateType) => state.profilePage.persons)
  const [activePerson, setActivePerson] = useState(0)
  const dispatch = useDispatch()

  const setProfile = () => {
    const profile = persons[activePerson]
    dispatch(profileActions.setProfile(profile))
    dispatch(actions.setWallet(profile.saving))
  }

  const ContinueButton: FC = () => {
    return (
      <div className="continue">
        <NavLink to='/work'>
          <button className="continueButton buttonNav" onClick={() => setProfile()}>
            <RightSquareOutlined />
          </button>
        </NavLink>
      </div>
    )
  }

  return (
    <>
      <div className="profile bannerBack">
        <div className="profileContent">
          <div className="profileContentButtons">
            <ReturnBackButton link='/'/>
            <ContinueButton />
          </div>
          <RenderPersons persons={persons} activePerson={activePerson} setActivePerson={setActivePerson}/>
        </div>
      </div>
    </>
  )
}

const RenderPersons: FC<{persons: personType[], activePerson: number, setActivePerson: SetStateAction<any>}> = (props) => {

  const onChange = (key: number) => {
    props.setActivePerson(key)
  }

  return (
    <>
      <div className="persons">
        <Carousel afterChange={onChange} dots={{className: 'personsDots'}} dotPosition={"left"}>
          {props.persons.map((person, index) => <RenderPerson person={person} key={index} />)}
        </Carousel>
      </div>
    </>
  )
}
export const RenderPerson: FC<{person: personType}> = ({person}) => {
  return (
    <>
      <div className="person">
        <div className="personInfo">
          <div className="personInfo__name">
            {person.name}
          </div>
          <div className="personInfo__age">
            Возраст: {person.age} лет
          </div>
          <div className="personInfo__tax">
            Капитал: {person.saving}
          </div>
          <div className="personInfo__preferences">
            <div className="personInfo__preferencesTitle">
              Предпочтения
            </div>
            {person.preferences.map((pref, index) => {
              // TODO перевести в будующем на SWITCH/CASE
              let prefTitle = pref.type === 'it' ? 'ИТ' : `${pref.type === 'manager' ? 'Менеджемент' : 'Инженерия'}`

              let prefCount = Array(pref.rise).fill('')

              const RenderPrefSquare = () => {
                return (
                  <>
                    <div className="personInfo__preferencesBlock"></div>
                  </>
                )

              }

              return (
                <>
                  {pref.rise > 0
                    ? <>
                        <b>{prefTitle}</b>
                        <div className="personInfo__preferencesBlocks">
                          {prefCount.map(() => <RenderPrefSquare />)}
                        </div>
                      </>
                    : ''
                  }
                </>
              )
            })}
          </div>
        </div>
        <div className="personImg">
          <img src={person.img} alt=""/>
        </div>
      </div>
    </>
  )
}