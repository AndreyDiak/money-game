import React, {FC, SetStateAction, useState} from "react";
import {Button, InputNumber} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {actions} from "../../redux/game-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getWalletSelector} from "../../redux/game-selector";
import {myStockType, stocksActions, stockType} from "../../redux/stocks-reducer";
import { Line } from "react-chartjs-2";

export type RenderChartType = {
  setIsHistoryShown: SetStateAction<any>
  stock: stockType
  wallet: number
  stocks: stockType[]
  myStocks: myStockType[]
}
export type DataType = {
  name: string,
  price: number
}

export const RenderChart: FC<RenderChartType> = React.memo((props) => {

  const [isFormShown, setIsFormShown] = useState(false)
  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(1 * props.stock.price[props.stock.price.length - 1])

  const wallet = useSelector(getWalletSelector)

  const dispatch = useDispatch()

  const Months = [
    'Январь', '', '', '', 'Февраль', '', '', '', 'Март', '', '', '',
    'Апрель', '', '', '', 'Май', '', '', '', 'Июнь', '', '', '',
    'Июль', '', '', '', 'Август', '', '', '', 'Сентябрь', '', '', '',
    'Октябрь', '', '', '', 'Ноябрь', '', '', '', 'Декабрь', '', '', '',
  ]
  let labels: any[] = []

  // TODO настройка показа графика(неделя / месяц / год / все время)

  props.stock.price.forEach((price, index) => {
    let labelsCopy = [...labels]
    if(props.stock.price.length > 48 && index < props.stock.price.length - 48) {
      return
    }
    // let dataCopyItem = {
    //   name: Months[index % 48],
    //   price: price,
    //   pv: 2400,
    //   amt: 2400
    // }

    labelsCopy.push(price)
    labels = labelsCopy
  })

  console.log(labels)
  console.log('====================')

  const data = {
    labels: Months,
    datasets: [
      {
        label: 'цена за шт.',
        data: labels,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // при покупке акции обновляем оставшееся её количество . . .
  const updateStocksCount = () => {
    let stockCopy = [...props.stocks]
    stockCopy.forEach((stock, index) => {
      if (stock.title === props.stock.title) {
        stockCopy[index] = {
          ...stockCopy[index],
          count: stockCopy[index].count - stocksToBuyCount
        }
      }
    })
    // обновляем данные по количеству акций . . .
    dispatch(stocksActions.updateStocks(stockCopy))
  }

  // покупаем акцию и добовляем её в портфель . . .
  const addStocks = (stock: stockType) => {
    let myStocksCopy = [...props.myStocks]

    let newStock: myStockType = {
      title: stock.title,
      price: stock.price[stock.price.length - 1],
      count: stocksToBuyCount,
      oldPrice: stock.price[stock.price.length - 1],
      condition: stock.condition
    }

    myStocksCopy = [...myStocksCopy, newStock]

    dispatch(stocksActions.updateMyStocks(myStocksCopy))
  }

  const buyStocks = () => {
    dispatch(actions.setWallet(wallet - stocksToBuyPrice))
    setStocksToBuyCount(0)
    setStocksToBuyPrice(0)
    updateStocksCount()
    addStocks(props.stock)
  }

  return (
    <>
      <div className="chartPopup">
        <div className="chartPopupBlock">
          <div className="chartPopupBlock__Close" onClick={() => props.setIsHistoryShown(false)}>
            <CloseOutlined/>
          </div>
          <div className="chartPopupBlock__Title">
            <div>График с ценой на акции компании:</div>
            <b>{props.stock.title}</b>
          </div>
          {/* рисуем график с ценой на акции . . . */}

          <Line data={data} options={options} title='цена акций' contextMenu={'Привет'} />

          {/*<LineChart width={600} height={250} data={data}>*/}
          {/*  <Line type="monotone" dataKey="price"/>*/}
          {/*  /!*<CartesianGrid stroke="#ccc" strokeDasharray="10 10"/>*!/*/}
          {/*  <XAxis dataKey="name"/>*/}
          {/*  <YAxis/>*/}
          {/*  <Tooltip/>*/}
          {/*</LineChart>*/}

          {/*<Line data={data} options={options} className='chartPopupBlock__Chart'/>*/}
          <div>
            <button className="chartPopupBlock__Button" onClick={() => setIsFormShown(true)}>
              Купить акцию
            </button>
          </div>
          <div style={isFormShown ? {display: "block"} : {display: "none"}}>
            <hr/>
            Доступных акций для покупки - <b>{props.stock.count}</b>
            <div>
              <InputNumber min={0} max={props.stock.count} value={stocksToBuyCount} onChange={(value) => {
                setStocksToBuyCount(value)
                setStocksToBuyPrice(value * props.stock.price[props.stock.price.length - 1])
              }}/>
            </div>
            <div>
              Стоимость покупки акций: <b>{stocksToBuyPrice}</b>
            </div>
            <div
              style={stocksToBuyCount > 0
                ? {display: 'block', textAlign: 'center'}
                : {display: 'none', textAlign: 'center'}
              }>
              <hr/>
              <Button disabled={!(stocksToBuyPrice <= props.wallet)} onClick={() => buyStocks()}>
                Купить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})