import {SellPopup} from "./Game/SellPopup";
import {RenderChart} from "./Game/RenderChart";
import {myStockType, stockType} from "../redux/stocks-reducer";
import {FC, SetStateAction} from "react";

export type PopupsType = {
  myStock: myStockType
  setIsStockToSell: SetStateAction<any>
  activeStock: number
  setIsHistoryShown: SetStateAction<any>
  stock: stockType
  isHistoryShown: boolean
  isStockToSell: boolean
  showExitModal: boolean
}

export const Popups:FC<PopupsType> = (props) => {
  return (
    <>
      {props.isStockToSell && <SellPopup stock={props.myStock} setIsStockToSell={props.setIsStockToSell} activeStock={props.activeStock}/>}
      {props.isHistoryShown && <RenderChart setIsHistoryShown={props.setIsHistoryShown} stock={props.stock}/>}
    </>
  )
}