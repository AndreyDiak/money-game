import React from "react";
import { useRoutes } from "react-router-dom";
import { BusinessPage } from "./BusinessPage";
import { RealtyPage } from "./Realty/RealtyPage";
import { StocksPage } from "./Stocks/StocksPage";

export const MarketPage = React.memo(() => {
  
  const routes = useRoutes([
    {
      path: '/stocks',
      element: 
      <StocksPage />
    },
    {
      path: '/',
      index: true,
      element: 
      <StocksPage />
    },
    {
      path: '/realty',
      element: <RealtyPage />
    },
    {
      path: '/business',
      element: <BusinessPage />
    }
  ])
  
return (
  <>
    {routes}
  </>
)
})