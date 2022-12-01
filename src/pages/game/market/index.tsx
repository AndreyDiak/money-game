import { Spin } from "antd";
import React, { Suspense } from "react";
import { MarketRoutes } from "./_routes";

const MarketPage = React.memo(() => {
  console.log('market page')

  return (
    <div className="">
      <Suspense fallback={
      <div>
        <Spin size="large" />
        <i>идет загрузка...</i>
      </div>
    }>
      <MarketRoutes />
    </Suspense>
    </div>
  )
});
  
export default MarketPage