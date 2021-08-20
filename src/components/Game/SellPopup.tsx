import {FC, SetStateAction, useState} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Button, InputNumber} from "antd";
import {actions} from "../../redux/game-reducer";
import {useDispatch} from "react-redux";
import {myStockType, stocksActions} from "../../redux/stocks-reducer";

export type SellPopupType = {
  stock: myStockType
  wallet: number
  setIsStockToSell: SetStateAction<any>
  myStocks: myStockType[]
}
export const SellPopup: FC<SellPopupType> = (props) => {
  // количество акций на продажу . . .
  const [stocksToSellCount, setStocksToSellCount] = useState(1)

  const dispatch = useDispatch()

  return (
    <>
      <div className="sellPopup">
        <div className="sellPopupBlock">
          <div className="sellPopupBlock__Close">
            <CloseOutlined onClick={() => props.setIsStockToSell(false)}/>
          </div>
          <div className="sellPopupBlock__Title">
            <div>Вы хотите продать акции компании:</div>
            <b>{props.stock.title}</b>
          </div>
          <hr/>
          <div>
            Кол-во акций в портфеле: <b>{props.stock.count}</b>
          </div>
          <div>
            <label htmlFor="">
              Сколько хотите продать <InputNumber min={1} max={props.stock.count} defaultValue={1} onChange={(value) => setStocksToSellCount(value)}/>
            </label>
            <div>
              Вы получите:
              <b style={props.stock.oldPrice <= props.stock.price ? {color: '#51ff3d'} : {color: "red"}}>
                {stocksToSellCount * props.stock.price}
              </b>
              Выручка: ({stocksToSellCount * props.stock.price - stocksToSellCount * props.stock.oldPrice})
            </div>
          </div>
          <hr/>
          <div style={{textAlign: 'center'}}>
            <Button onClick={() => {
              props.setIsStockToSell(false)
              // уменьшаем количество акций в пакете . . .
              dispatch(stocksActions.sellStocks(props.stock, stocksToSellCount))
              // увеличиваем баланс пользователя . . .
              dispatch(actions.setWallet(props.wallet + stocksToSellCount * props.stock.price))
            }}>
              Продать
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}