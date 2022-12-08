import React from "react";
import { BondsList } from "./BondsList/BondsLIst";

const BondsPage = React.memo(() => {
  return (
    <div>
      <BondsList />
    </div>
  )
});

export default BondsPage;