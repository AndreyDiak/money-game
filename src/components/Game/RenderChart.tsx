import React, {FC, SetStateAction, useState} from "react";
import {Button, InputNumber} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {actions} from "../../redux/game-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getWalletSelector} from "../../redux/game-selector";
import {myStockType, stocksActions, stockType} from "../../redux/stocks-reducer";
import { Line } from "react-chartjs-2";
import {getMyStocksSelector, getStocksSelector} from "../../redux/stocks-selector";
import {settingsActions} from "../../redux/settings-reducer";
import {getConstTimeSpeedSelector} from "../../redux/settings-selector";

export type RenderChartType = {
  setIsHistoryShown: SetStateAction<any>
  stock: stockType
}


export const RenderChart: FC<RenderChartType> = React.memo((props) => {
  const dispatch = useDispatch()
  const timeSpeed = useSelector(getConstTimeSpeedSelector)

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

    labelsCopy.push(price)
    labels = labelsCopy
  })


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

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  return (
    <>
      <div className="chartPopup">
        <div className="chartPopupBlock">
          <div className="chartPopupBlock__Close" onClick={() => {
            props.setIsHistoryShown(false)
            onChangeTime(timeSpeed)
          }}>
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
          <RenderChartMenu stock={props.stock} />
        </div>
      </div>
    </>
  )
})

type RenderChartMenuType = {
  stock: stockType
}

export const RenderChartMenu: FC<RenderChartMenuType> = (props) => {


  const wallet = useSelector(getWalletSelector)
  const dispatch = useDispatch()

  // массив с акциями . . .
  const stocks = useSelector(getStocksSelector)
  // массив купленных акций . . .
  const myStocks = useSelector(getMyStocksSelector)
  const [isFormShown, setIsFormShown] = useState(false)
  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(props.stock.price[props.stock.price.length - 1])

  // при покупке акции обновляем оставшееся её количество . . .
  const updateStocksCount = () => {
    let stockCopy = [...stocks]
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
    let myStocksCopy = [...myStocks]

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
      <div className='chartPopupBlock__Menu'>
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
            <Button disabled={!(stocksToBuyPrice <= wallet)} onClick={() => buyStocks()}>
              Купить
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}