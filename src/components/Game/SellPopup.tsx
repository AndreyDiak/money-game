import {FC, SetStateAction, useState} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Button, InputNumber} from "antd";
import {actions} from "../../redux/game-reducer";
import {useDispatch, useSelector} from "react-redux";
import {myStockType, stocksActions} from "../../redux/stocks-reducer";
import {getWalletSelector} from "../../redux/game-selector";
import {getMyStocksSelector} from "../../redux/stocks-selector";
import {settingsActions} from "../../redux/settings-reducer";
import {getConstTimeSpeedSelector} from "../../redux/settings-selector";

export type SellPopupType = {
  stock: myStockType
  setIsStockToSell: SetStateAction<any>
  activeStock: number
}
export const SellPopup: FC<SellPopupType> = (props) => {
  // количество акций на продажу . . .
  const [stocksToSellCount, setStocksToSellCount] = useState(1)
  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  const wallet = useSelector(getWalletSelector)
  const dispatch = useDispatch()

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  return (
    <>
      <div className="sellPopup">
        <div className="sellPopupBlock">
          <div className="sellPopupBlock__Close">
            <CloseOutlined onClick={() => {
              props.setIsStockToSell(false)
              onChangeTime(timeSpeed)
            }}/>
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
              console.log(props.activeStock)
              // возвращаем скорость времени
              onChangeTime(timeSpeed)
              // уменьшаем количество акций в пакете . . .
              dispatch(stocksActions.sellStocks(props.stock, stocksToSellCount, props.activeStock))
              // увеличиваем баланс пользователя . . .
              dispatch(actions.setWallet(Math.round(wallet + stocksToSellCount * props.stock.price)))
            }}>
              Продать
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}