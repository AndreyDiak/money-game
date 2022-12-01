import { useRoutes } from 'react-router-dom';
import React from "react";

const NewsPage = React.lazy(() => import('./news'))
const BankPage = React.lazy(() => import('./bank'))
const MarketPage = React.lazy(() => import('./market'))
const ProfilePage = React.lazy(() => import('./profile'))
const SpendsPage = React.lazy(() => import('./spends'))

export const GameRoutes = React.memo(() => {
  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <ProfilePage />
    },
    {
      path: '/spends',
      element: <SpendsPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/bank',
      element: <BankPage />
    },
    {
      path: '/news',
      element: <NewsPage />
    },
    {
      path: '/market/*',
      element: <MarketPage />
    }
  ])

  return routes
})
