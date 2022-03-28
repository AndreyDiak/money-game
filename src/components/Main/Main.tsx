import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { appActions, loginThunk } from "../../redux/app-reducer";
import { AppStateType } from "../../redux/store";
// import BankPage from "../Game/BankPage";
import { GamePage } from "../Game/GamePage";
// import MarketPage from "../Game/Market/MarketPage";
// import NewsPage from "../Game/NewsPage";
// import RenderPlayerWork from "../Game/RenderPlayerWork";
// import SpendsPage from "../Game/Spends/SpendsPage";
import { MenuPage } from "../Menu/MenuPage";
import { ProfilePage } from "../Profile/ProfilePage";


const BankPage = React.lazy(() => import('../Game/BankPage'))
const MarketPage = React.lazy(() => import('../Game/Market/MarketPage'))
const NewsPage = React.lazy(() => import('../Game/NewsPage'))
const RenderPlayerWork = React.lazy(() => import('../Game/RenderPlayerWork')) 
const SpendsPage = React.lazy(() => import('../Game/Spends/SpendsPage')) 

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
        <Suspense fallback={
          <div>
            загрузка...
          </div>
        }>
          <Pages />
        </Suspense>
      </BrowserRouter>
    </>
  )
}

const Pages = () => {
  const routes = useRoutes([
    {
      path: '/menu',
      element: <MenuPage />
    },
    {
      path: '/game',
      element: <GamePage />,
      children: [
        {
          path: 'spends',
          element: <SpendsPage/> ,
        },
        {
          path: 'profile',
          element: <RenderPlayerWork />
        },
        {
          path: 'bank',
          element: <BankPage />
        },
        {
          path: 'news',
          element: <NewsPage />
        },
        {
          path: 'market',
          element: <MarketPage />,
        }
      ]
    },
    {
      path: '/select',
      element: <ProfilePage />
    },
    {
      path: '/',
      index: true,
      element: <MenuPage />
    },
    {
      path: '/money-game',
      index: true,
      element: <MenuPage />
    },
    {
      path: '/money-game-demo',
      index: true,
      element: <MenuPage />
    }
  ])
  return (
    <>
      {routes}
    </>
  )
}
