import { Spin } from "antd";
import React, { Suspense } from "react";
import { MarketRoutes } from "./_routes";

const MarketPage = React.memo(() => {
  return (
      <Suspense fallback={
      <div>
        <Spin size="large" />
        <i>идет загрузка...</i>
      </div>
    }>
      <MarketRoutes />
    </Suspense>
  )
});
  
export default MarketPage;