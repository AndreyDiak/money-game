import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import {GamePage} from "../Game/GamePage";
import {MenuPage} from "../Menu/MenuPage";
import {ProfilePage} from "../Profile/ProfilePage";
import {SettingsPage} from "../Settings/SettingsPage";
import { WorkPage } from "../Work/WorkPage";
import {RoflPage} from "../rofl/RoflPage";
import {AuthPage} from "../AuthPage";
import {LoginPage} from "../LoginPage";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

export const Main = () => {

  const token = useSelector((state: AppStateType) => state.app.token)

  const isAuth = !!token

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isAuth
         ? <Switch>
            <Redirect exact from='/' to='/menu'/>
            <Redirect exact from='/money-game' to='/menu'/>
            <Redirect exact from='/money-game-demo' to='/menu'/>
            <Route path='/menu' render={() => <MenuPage /> }/>
            <Route path='/work' render={() => <WorkPage /> }/>
            <Route path='/game' render={() => <GamePage /> }/>
            <Route path='/profile' render={() => <ProfilePage /> }/>
            <Route path='/settings' render={() => <SettingsPage/> }/>
            <Route path='/rofl' render={() => <RoflPage/> }/>
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

