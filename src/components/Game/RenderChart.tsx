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
import {AppStateType} from "../../redux/store";
import {profileActions, updateIncome} from "../../redux/profile-reducer";

export type RenderChartType = {
  setIsHistoryShown: SetStateAction<any>
  stock: stockType
}


export const RenderChart: FC<RenderChartType> = (props) => {
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
        // сглаживание . . .
        lineTension: 0.4,
        // цвета . . .
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
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
          <RenderChartMenu stock={props.stock} setIsHistoryShown={props.setIsHistoryShown}/>
        </div>
      </div>
    </>
  )
}

type RenderChartMenuType = {
  stock: stockType
  setIsHistoryShown: SetStateAction<any>
}

export const RenderChartMenu: FC<RenderChartMenuType> = (props) => {


  const wallet = useSelector(getWalletSelector)
  const dispatch = useDispatch()

  const timeSpeed = useSelector(getConstTimeSpeedSelector)
  // массив с акциями . . .
  const stocks = useSelector(getStocksSelector)

  const filteredStocks = useSelector((state: AppStateType) => state.stocksPage.filteredStocks)
  // массив купленных акций . . .
  const myStocks = useSelector(getMyStocksSelector)
  const [stocksToBuyCount, setStocksToBuyCount] = useState(1)
  const [stocksToBuyPrice, setStocksToBuyPrice] = useState(props.stock.price[props.stock.price.length - 1])

  // при покупке акции обновляем оставшееся её количество . . .
  const updateStocksCount = () => {
    let stockCopy = [...stocks]
    let filteredStocksCopy = [...filteredStocks]
    stockCopy.forEach((stock, index) => {
      if (stock.title === props.stock.title) {
        stockCopy[index] = {
          ...stockCopy[index],
          count: stockCopy[index].count - stocksToBuyCount
        }
        // TODO
        filteredStocksCopy.map((fStock, fIndex) => {
          if (fStock.title === props.stock.title) {
            filteredStocksCopy[fIndex] = {
              ...filteredStocksCopy[fIndex],
              count: filteredStocksCopy[fIndex].count - stocksToBuyCount
            }
          }
        })
        // filteredStocksCopy[index] = {
        //   ...filteredStocksCopy[index],
        //   count: filteredStocksCopy[index].count - stocksToBuyCount
        // }
      }
    })
    // обновляем данные по количеству акций . . .
    dispatch(stocksActions.updateStocks(stockCopy, filteredStocksCopy))
  }

  // покупаем акцию и добовляем её в портфель . . .
  const addStocks = (stock: stockType) => {
    let myStocksCopy = [...myStocks]

    let newStock: myStockType = {
      title: stock.title,
      price: stock.price[stock.price.length - 1],
      count: stocksToBuyCount,
      oldPrice: stock.price[stock.price.length - 1],
      condition: stock.condition,
      dividendsAmount: stock.dividendsAmount
    }

    myStocksCopy = [...myStocksCopy, newStock]

    dispatch(stocksActions.updateMyStocks(myStocksCopy))
  }

  const buyStocks = () => {
    dispatch(actions.setWallet(Math.round(wallet - stocksToBuyPrice)))
    setStocksToBuyCount(0)
    setStocksToBuyPrice(0)
    updateStocksCount()
    addStocks(props.stock)
    dispatch(updateIncome())
  }

  const onChangeTime = (time: number) => {
    dispatch(settingsActions.setTimeSpeed(time))
  }

  const setStocksCount = (count: number) => {
    if(count <= 0) {
      setStocksToBuyCount(1)
      setStocksToBuyPrice(props.stock.price[props.stock.price.length - 1])
      return
    }
    if(count > props.stock.count) {
      setStocksCount(props.stock.count)
      setStocksToBuyPrice(props.stock.count * props.stock.price[props.stock.price.length - 1])
      return
    }
    setStocksToBuyCount(count)
    setStocksToBuyPrice(count * props.stock.price[props.stock.price.length - 1])
  }

  return (
    <>
      <div className='chartPopupBlock__Menu'>
        <div className="chartPopupBlock__MenuInfo">
          <div className="chartPopupBlock__MenuInfo__Title">
            Доступных акций :  <b>{props.stock.count}</b>
          </div>
          <div>
            <InputNumber className='chartPopupBlock__MenuInfo__Input' min={0} max={props.stock.count} value={stocksToBuyCount} onChange={(value) => {
              setStocksToBuyCount(value)
              setStocksToBuyPrice(value * props.stock.price[props.stock.price.length - 1])
            }}/>
            <button onClick={() => setStocksCount(1)}> min </button>
            <button onClick={() => setStocksCount(stocksToBuyCount - 1)}> -1 </button>
            <button onClick={() => setStocksCount(stocksToBuyCount - 5)}> -5 </button>
            <button onClick={() => setStocksCount(stocksToBuyCount - 10)}> -10 </button>
            <button onClick={() => setStocksCount(stocksToBuyCount + 10)}> +10 </button>
            <button onClick={() => setStocksCount(stocksToBuyCount + 5)}> +5 </button>
            <button onClick={() => setStocksCount(stocksToBuyCount + 1)}> +1 </button>
            <button onClick={() => setStocksCount(props.stock.count)}> max </button>
          </div>
        </div>
          <div>
            <Button
              size='large'
              disabled={!(stocksToBuyPrice <= wallet)
                || props.stock.count <= 0
                || stocksToBuyCount < 1
                || stocksToBuyCount > props.stock.count}
              onClick={() => {
              // возвращаем скорость времени
              onChangeTime(timeSpeed)
              buyStocks()
              props.setIsHistoryShown(false)
            }}>
              Купить
            </Button>
          </div>
      </div>
      <div>
        Вы заплатите : <b>${(stocksToBuyPrice).toFixed(1)}</b>
      </div>
      <div>
        Девиденды : <b>${(props.stock.dividendsAmount * stocksToBuyCount).toFixed(2)} / мес.</b>
      </div>
    </>
  )
}