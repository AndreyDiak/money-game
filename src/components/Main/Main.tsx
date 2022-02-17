import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import {GamePage} from "../Game/GamePage";
import {MenuPage} from "../Menu/MenuPage";
import {ProfilePage} from "../Profile/ProfilePage";
import {SettingsPage} from "../Settings/SettingsPage";
import { WorkPage } from "../Work/WorkPage";
import {RoflPage} from "../rofl/RoflPage";
import {AuthPage} from "../AuthPage";
import {LoginPage} from "../LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useEffect, useState} from "react";
import {UserPage} from "../User/UserPage";
import {appActions, loginThunk} from "../../redux/app-reducer";

const STORAGE_NAME = 'PROFILE_LOCAL_STORAGE'

export const Main = () => {

  const token = useSelector((state: AppStateType) => state.app.token)
  const dispatch = useDispatch()
  const [isAuth, setIsAuth] = useState(!!token)
  const ready = useSelector((state: AppStateType) => state.app.ready)
  useEffect(() => {
    setIsAuth(!!token)
  }, [token])

  useEffect(() => {
    // @ts-ignore
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME))

    if (data && data.token) {
      dispatch(loginThunk(data.token, data.userId))
    }

    dispatch(appActions.setReady())

  }, [loginThunk])

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {!isAuth
         ? <Switch>
            <Redirect exact from='/' to='/menu'/>
            <Redirect exact from='/money-game' to='/menu'/>
            <Redirect exact from='/money-game-demo' to='/menu'/>
            <Route path='/menu' render={() => <MenuPage /> }/>
            <Route path='/work' render={() => <WorkPage /> }/>
            <Route path='/game' render={() => <GamePage /> }/>
            <Route path='/user' render={() => <UserPage /> }/>
            <Route path='/profile' render={() => <ProfilePage /> }/>
            <Route path='/settings' render={() => <SettingsPage/> }/>
            <Route path='/rofl' render={() => <RoflPage/> }/>
            <Redirect to='/'/>
          </Switch>
         : <Switch>
            <Route path='/register' render={() => <AuthPage/>}/>
            <Route path='/login' render={() =>  <LoginPage/>}/>
            <Redirect to='/login'/>
          </Switch>
        }
      </BrowserRouter>
    </>
  )
}

