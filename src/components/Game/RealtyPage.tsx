import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Button, Carousel} from "antd";
import {realtyActions, realtyType} from "../../redux/realty-reducer";
import {profileActions, updateIncome} from "../../redux/profile-reducer";
import {getIncomeSelector} from "../../redux/profile-selector";
import {getWalletSelector} from "../../redux/game-selector";
import {actions} from "../../redux/game-reducer";

export const RealtyPage = () => {

  const dispatch = useDispatch()
  const myRealty = useSelector((state: AppStateType) => state.realtyPage.myRealty)
  const activeRealty = useSelector((state: AppStateType) => state.realtyPage.activeRealty) as realtyType
  const wallet = useSelector(getWalletSelector)

  const buyRealty = () => {
    // покупаем дом . . .
    dispatch(realtyActions.buyRealty())
    // обновляем доход . . .
    dispatch(updateIncome())
    // снимаем баланс пользователя
    dispatch(actions.updateWalletFromSpends(activeRealty.deposit))
  }

  return (
    <>
      <div className="gameRealty bannerBack">
        <div className="gameRealtyContent">
          <div className="gameRealtyContent__realty">
            <div className="gameRealtyContent__realtyTitle">
              Ваша недвижимость
            </div>
            {myRealty.length !== 0
              // ? <div className="gameRealtyContent__realtyItems">
                ? <Carousel className="gameRealtyContent__realtyItems">
                {myRealty.map(realty => {
                  return (
                    <>
                      <div className="gameRealtyContent__realtyItem">
                        <div className="gameRealtyContent__realtyItem__img">
                          <img src={realty.photo} alt=""/>
                        </div>
                        <div className="gameRealtyContent__realtyItem__title">
                          {realty.title}
                        </div>
                        <div className="gameRealtyContent__realtyItem__income">
                          ДОХОД : ${realty.payment}
                        </div>
                        <div className="gameRealtyContent__realtyItem__price">
                          ЦЕНА : ${realty.price}
                        </div>
                      </div>
                    </>
                  )
                })}
              </Carousel>
              // </div>
             : <div style={{textAlign: 'center'}}>
                <b>У вас нет недвижимости!</b>
              </div>
            }
          </div>
          <div className='gameRealtyContent__block'>
            {activeRealty
              ?
                <>
                  <div className="gameRealtyContent__realtyTitle">
                    Дом на продажу
                  </div>
                  <div className="gameRealtyContent__blockInfo">
                    <div className='gameRealtyContent__blockInfo__price'>
                      <div className='gameRealtyContent__blockInfo__priceItem'>
                        <div>ЦЕНА:</div> ${activeRealty.price}
                      </div>
                      <div className='gameRealtyContent__blockInfo__priceItem'>
                        <div>ПЕРВЫЙ ДЕПОЗИТ:</div> ${activeRealty.deposit}
                      </div>
                      <div className='gameRealtyContent__blockInfo__priceItem'>
                        <div>МЕСЯЧНЫЙ ДОХОД:</div> ${activeRealty.payment}
                      </div>
                    </div>
                    <div className="gameRealtyContent__blockImg">
                      <img src={activeRealty.photo} alt=""/>
                    </div>
                  </div>
                  <div className="gameRealtyContent__blockButton">
                    <Button onClick={buyRealty} disabled={wallet < activeRealty.deposit}>
                      Купить
                    </Button>
                  </div>
                </>
              : <div style={{textAlign: 'center'}}>
                  <b>Ждите новое предложение!</b>
                </div>
            }
            </div>
        </div>
      </div>
    </>
  )
}