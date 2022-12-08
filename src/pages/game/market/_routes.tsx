import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import { PortfolioList } from "../../../components/game/market/PortfolioList";

const BondsPage = React.lazy(() => import('./bonds'));
const StocksPage = React.lazy(() => import('./stocks'));
const MarginPage = React.lazy(() => import('./margin'));

export const MarketRoutes = React.memo(() => {

  const [screenWidth] = useState(window.screen.width);

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
      path: 'bonds',
      element: <BondsPage />
    },
    {
      path: 'margin',
      element: <MarginPage />
    },
    {
      path: 'portfolio',
      element: <PortfolioList />
    }
  ])

  return (
    <>
      {screenWidth > 768 ? (
        <>
          <PortfolioList />
          {routes}
        </>
      ) : routes}
    </>
  )
});