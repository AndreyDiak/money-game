import React, {FC} from "react";

type RenderPlayerSpendType = {
  title: string
  price: number
  index: number
}
export const SpendsCard: FC<RenderPlayerSpendType> = (props) => {
  return (
    <>
      <div className="gameSpendContent__Item">
        <div className="gameSpendContent__ItemTitle"><b>{props.title}</b></div>
        <div className="gameSpendContent__ItemPrice">${props.price}</div>
      </div>
    </>
  )
}