import React from "react"
import { useRoutes } from "react-router-dom"

const RealtyPage = React.lazy(() => import('./realty'));
const StocksPage = React.lazy(() => import('./stocks'));
const BusinessPage = React.lazy(() => import('./business'));

export const MarketRoutes = React.memo(() => {

  const routes = useRoutes([
    {
      path: '',
      index: true,
      element: <StocksPage />
    },
    {
      path: 'stocks',
      element: <StocksPage />
    },
    {
      path: 'realty',
      element: <RealtyPage />
    },
    {
      path: 'business',
      element: <BusinessPage />
    }
  ])

  return routes
});