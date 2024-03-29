import Button from "antd/lib/button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyBusinessThunk, sellBusinessThunk } from "../../../../redux/market/business/business-reducer";
import { getBusinessesSelector, getMyBusinessesSelector } from "../../../../redux/market/business/business-selector";
import { getWalletSelector } from "../../../../redux/game/game-selector";
import { updateIncome } from "../../../../redux/profile/profile-reducer";



const BusinessPage = React.memo(() => {

  const dispatch = useDispatch()
  const businesses = useSelector(getBusinessesSelector)
  const myBusinesses = useSelector(getMyBusinessesSelector)
  const wallet = useSelector(getWalletSelector)
  const [isMyBusinessShown, setIsMyBusinessShown] = useState(false)

  const buyBusiness = (index: number) => {
    dispatch(buyBusinessThunk(businesses[index]))
    dispatch(updateIncome())
  }

  const sellBusiness = (index: number) => {
    dispatch(sellBusinessThunk(myBusinesses[index], Math.round(myBusinesses[index].price * 0.6)))
    dispatch(updateIncome())
  }

  return (
    <>
      <div className="gameBusiness bannerBack">
        <div className="container">
          <div className="gameBusinessContent">
            <div className="gameBusinessContent__menu">
              <Button onClick={() => setIsMyBusinessShown(!isMyBusinessShown)}>
                {isMyBusinessShown ? 'Доступный Бизнес' : 'Мой Бизнес'}
              </Button>
            </div>

            <div className="gameBusinessContent__blocks">
              {isMyBusinessShown
                ? <>
                  {myBusinesses.map((myBusiness, index) => {
                    return (
                      <>
                        <div className="gameBusinessContent__block">
                          <div className="gameBusinessContent__blockTitle">
                            <b>{myBusiness.name}</b>
                          </div>
                          <div className="gameBusinessContent__blockImg">
                            <img src={myBusiness.img} alt=""/>
                          </div>
                          <div className="gameBusinessContent__blockIncome">
                            Месячный доход <br/>
                            <b style={{color: '#388e3c'}}>${myBusiness.income}</b>
                          </div>
                          <div className="gameBusinessContent__blockPrice">
                            Цена продажи <br/>
                            <b style={{color: '#ff1744'}} >${(myBusiness.price * 0.6).toFixed(0)}</b>
                          </div>
                          <div className='gameBusinessContent__blockButton' >
                            <Button onClick={() => sellBusiness(index)}>
                              Продать
                            </Button>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </>
                : <>
                  {businesses.map((business, index) => {
                    return (
                      <>
                        <div className="gameBusinessContent__block">
                          <div className="gameBusinessContent__blockTitle">
                            <b>{business.name}</b>
                          </div>
                          <div className="gameBusinessContent__blockImg">
                            <img src={business.img} alt=""/>
                          </div>
                          <div className="gameBusinessContent__blockIncome">
                            Месячный доход <br/>
                            <b style={{color: '#388e3c'}}>${business.income}</b>
                          </div>
                          <div className="gameBusinessContent__blockPrice">
                            Цена покупки <br/>
                            <b style={{color: '#ff1744'}} >${business.price}</b>
                          </div>
                          <div className='gameBusinessContent__blockButton' >
                            <Button disabled={wallet < business.price} onClick={() => buyBusiness(index)}>
                              Купить
                            </Button>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default BusinessPage;