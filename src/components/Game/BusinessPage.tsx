import { Button } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getBusinessesSelector} from "../../redux/business-selector";
import {getWalletSelector} from "../../redux/game-selector";
import {updateIncome} from "../../redux/profile-reducer";
import {businessActions} from "../../redux/business-reducer";

export const BusinessPage = () => {

  const dispatch = useDispatch()
  const businesses = useSelector(getBusinessesSelector)
  const wallet = useSelector(getWalletSelector)

  const buyBusiness = (bIndex: number) => {
    dispatch(businessActions.addToMyBusinesses(businesses[bIndex]))
    dispatch(updateIncome())
  }

  return (
    <>
      <div className="gameBusiness bannerBack">
        <div className="gameBusinessContent__blocks">
          {businesses.map((business, index) => {
            return (
              <>
                <div className="gameBusinessContent__block">
                  <div className="gameBusinessContent__blockTitle">
                    {business.name}
                  </div>
                  <div className="gameBusinessContent__blockImg">
                    <img src={business.img} alt=""/>
                  </div>
                  <div className="gameBusinessContent__blockIncome">
                    МЕСЯЧНЫЙ ДОХОД <br/>
                    <b style={{color: '#57895b'}}>
                      ${business.income}
                    </b>
                  </div>
                  <div className="gameBusinessContent__blockPrice">
                    ЦЕНА ПОКУПКИ <br/>
                    <b style={{color: '#f67280'}}>
                      ${business.price}
                    </b>
                  </div>
                  <div className="gameBusinessContent__blockButton">
                    <Button disabled={wallet < business.price} onClick={() => buyBusiness(index)}>
                      Купить
                    </Button>
                  </div>

                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}