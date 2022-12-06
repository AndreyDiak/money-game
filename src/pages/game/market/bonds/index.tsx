import React from "react";
import { Bonds } from "../../../../components/game/market/bonds/Bonds";

const BondsList = React.memo(() => {
  return (
    <div>
      <Bonds />
    </div>
  )
});

export default BondsList;