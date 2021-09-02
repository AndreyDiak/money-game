import React, {FC} from "react";

type RenderPlayerSpendType = {
  title: string
  price: number
  index: number
}
export const RenderPlayerSpend: FC<RenderPlayerSpendType> = (props) => {
  return (
    <>
      <div className="gameSpendBlock__Item">
        <div className="gameSpendBlock__ItemTitle"><b>{props.title}</b></div>
        <div className="gameSpendBlock__ItemPrice">${props.price}</div>
      </div>
    </>
  )
}