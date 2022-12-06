import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import { PortfolioList } from "../../../components/game/market/PortfolioList";

const BondsList = React.lazy(() => import('./bonds'));
const StocksList = React.lazy(() => import('./stocks'));
const MaringList = React.lazy(() => import('./margin'));

export const MarketRoutes = React.memo(() => {

  const [screenWidth] = useState(window.screen.width);

  const routes = useRoutes([
    {
      path: '',
      index: true,
      element: <StocksList />
    },
    {
      path: 'stocks',
      element: <StocksList />
    },
    {
      path: 'bonds',
      element: <BondsList />
    },
    {
      path: 'margin',
      element: <MaringList />
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