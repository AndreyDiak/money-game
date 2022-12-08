import React, { useState } from "react"
import { FC } from "react"
import { Line } from "react-chartjs-2"
import { stockType } from "../../../../../redux/market/typings"

export const ChartGraph: FC<{ stock: stockType }> = React.memo(({ stock }) => {

  const [screenWidth] = useState(window.screen.width)
  const Months = [
    'Январь', '', '', '', 'Февраль', '', '', '', 'Март', '', '', '',
    'Апрель', '', '', '', 'Май', '', '', '', 'Июнь', '', '', '',
    'Июль', '', '', '', 'Август', '', '', '', 'Сентябрь', '', '', '',
    'Октябрь', '', '', '', 'Ноябрь', '', '', '', 'Декабрь', '', '', '',
  ]
  const MonthsSmall = Months.map(month => month.length > 4 ? month.toLowerCase().slice(0, 3).concat('.') : month.toLowerCase())
  let labels: any[] = []

  // TODO настройка показа графика(неделя / месяц / год / все время)
  stock.price.forEach((price, index) => {
    let labelsCopy = [...labels]
    if (stock.price.length > 48 && index < stock.price.length - 48) {
      return
    }

    labelsCopy.push(price)
    labels = labelsCopy
  })


  const data = {
    labels: screenWidth > 768 ? Months : MonthsSmall,
    datasets: [
      {
        label: 'цена за шт.',
        data: labels,
        fill: false,
        // сглаживание . . .
        lineTension: 0.4,
        // цвета . . .
        // backgroundColor: 'rgb(255, 99, 132)',
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
      x: {
        grid: {
          display: true,
        }
      },
      y: {
        grid: {
          display: true,
        }
      },
    },
  };
  const optionsSmall = {
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        }
      },
    },
  };

  return (
    <>
      <Line data={data} options={screenWidth > 768 ? options : optionsSmall} title='цена акций' contextMenu={'Привет'} />
    </>
  )
})
