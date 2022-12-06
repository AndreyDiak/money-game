import {useCallback, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Button, Image, message} from "antd";
import {NavLink} from "react-router-dom";
import defaultImage from "./../../img/default.png"
type UserProfileType = {
  email: string
  login: string
  isInstructionCompleted: boolean
  isEmailConfirmed: boolean
  avatar: string | null
  stats: {
    gamePlayed: number
    daysPlayed: number
    wins: number
    personsGame: {
      name: string
      gamePlayed: number
    }[]
  }
}

export const UserPage = () => {
  const personsForAvatar = useSelector((state: AppStateType) => state.profilePage.persons)
  const [profile, setProfile] = useState({} as UserProfileType)
  const [isAvatarPopupShown, setIsAvatarPopupShown] = useState(false)
  const [photo, setPhoto] = useState('')
  const {request, isLoading} = useHttp()
  const token = useSelector((state: AppStateType) => state.app.token)

  // const requestProfile = useCallback(async () => {
  //   try {
  //     const data = await request('/api/profile/', 'GET', null , {
  //       Authorization: `Bearer ${token}`
  //     })
  //     setProfile(data)
  //     // находим любимого персонажа . . .
  //     // TODO для тестировки данных
  //     console.log(data)
  //   } catch (e) {}
  // }, [token, request, setProfile])

  // const changePhoto = async () => {
  //   try {
  //     const data = await request('/api/profile/photo/', 'POST', {photo}, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     message.success(data.message)
  //     requestProfile()
  //   } catch (e) {}
  // }

  useEffect(() => {
    // requestProfile()
  }, [])

  if (isLoading) {
    return (
      <>
        загрузка
      </>
    )
  }

  return (
    <>
      {!!profile.stats
        ? <>
          {isAvatarPopupShown
            ? <>
                <div className="userPopup">
                  <div className="userPopupBlocks">
                    <span>
                      {personsForAvatar.map((person, index) => {
                        return (
                          <>
                            <div className="userPopupBlock">
                              <button onClick={() => setPhoto(person.avatar)}>
                                <img src={person.avatar} alt=""/>
                              </button>
                            </div>
                          </>
                        )
                      })}
                    </span>
                    <div className='userPopupButton'>
                      <Button type={'primary'} onClick={() => {
                        setIsAvatarPopupShown(false)
                        
                      }
                      }>
                        Подтвердить
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            : ''}
          <div className='userPage bannerBack'>
            <div className="container">
              <div className="userPageContent">
                <div className="userPageContent__profile">
                  <div className="userPageContent__profileImg">
                    <Image width={300} src={
                      !!profile.avatar ? profile.avatar : defaultImage
                    }/>
                    <br/>
                    <Button onClick={() => setIsAvatarPopupShown(true)} type={'primary'}>Сменить аватар</Button>
                  </div>
                  <div className="userPageContent__profileInfo">
                    <div className="userPageContent__profileInfo__name">
                      {profile.login}
                    </div>
                    <div className="userPageContent__profileInfo__mail">
                      Ваша почта: <b>{profile.email} </b>
                      {profile.isEmailConfirmed ? '' : <span> <Button type={'dashed'}>Подтвердить почту</Button></span>}
                    </div>
                    <div className="userPageContent__profileInfo__train">
                      {profile.isInstructionCompleted
                        ? <span>Вы прошли обучение: <Button>Повторить</Button> </span>
                        : <span>
                      Вам надо пройти обучение: <Button>Пройдите обучение</Button>
                    </span>
                      }
                    </div>
                  </div>
                  <div className="userPageContent__profileStats">
                    <div className="userPageContent__profileStats__title">
                      Ваша статистика
                      <hr/>
                    </div>
                    <div className="userPageContent__profileStats__favorite">
                      <b>Любимый персонаж</b>
                      <hr/>
                      {profile.stats.personsGame.length !== 0
                        ? <span>
                          <h2><b>{profile.stats.personsGame[profile.stats.personsGame.length - 1].name}</b></h2>
                          Игр: <b>{profile.stats.personsGame[profile.stats.personsGame.length - 1].gamePlayed}</b>
                        </span>
                        : <span>
                          Сыграйте хотя бы одну игру
                        </span>}
                    </div>
                    <div className="userPageContent__profileStats__info">
                      <div className="userPageContent__profileStats__infoBlock">
                        Сыграно игр:
                        <br/>
                        <b>
                          {profile.stats.gamePlayed}
                        </b>
                      </div>
                      <div className="userPageContent__profileStats__infoBlock">
                        Побед:
                        <br/>
                        <b>
                          {profile.stats.wins}
                        </b>
                      </div>
                      <div className="userPageContent__profileStats__infoBlock">
                        Игровых дней:
                        <br/>
                        <b>
                          {profile.stats.daysPlayed}
                        </b>
                      </div>
                      <div className="userPageContent__profileStats__infoBlock">

                      </div>
                    </div>
                  </div>
                </div>
                <div className="userPageContent__button">
                  <NavLink to='/'>
                    <Button type={'primary'} size={'large'}>
                      Обратно в меню
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </>
        : 'загрузка профиля' }
    </>
  )
}