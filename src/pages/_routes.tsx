import React from "react";
import { useRoutes } from 'react-router-dom';

const MenuPage = React.lazy(() => import('./menu'));
const GamePage = React.lazy(() => import('./game'));
const SelectPage = React.lazy(() => import('./select'));

export const AppRoutes = () => {

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <MenuPage />
    },
    {
      path: '/menu',
      element: <MenuPage />
    },
    {
      path: '/game/*',
      element: <GamePage />
    },
    {
      path: '/select',
      element: <SelectPage />
    }
  ])

  return routes;
};
