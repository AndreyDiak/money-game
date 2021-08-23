import Button from "antd/lib/button";
import {useSelector} from "react-redux";
import {getBusinessesSelector} from "../../redux/business-selector";

export const RenderPlayerBusiness = () => {

  const businesses = useSelector(getBusinessesSelector)

  return (
    <>
      <div className="gameBusiness bannerBack">
        <div className="gameBusinessBlocks">
          {businesses.map(business => {
            return (
              <>
                <div className='gameBusinessBlock'>
                  <div className="gameBusinessBlock__Title">
                    <b>{business.name}</b>
                  </div>
                  <div className="gameBusinessBlock__Img">
                    <img src={business.img} alt=""/>
                  </div>
                  <div className="gameBusinessBlock__Stats">
                    <div className="gameBusinessBlock__StatsMoney">
                      <div className="gameBusinessBlock__StatsMoney__Price">
                        Цена покупки: <b><i>{business.price}</i></b>
                      </div>

                      <div className="gameBusinessBlock__StatsMoney__Income">
                        Доход: <b><i>{business.income}</i></b>
                      </div>
                    </div>
                    <div className="gameBusinessBlock__StatsButton">
                      <Button>Приобрести</Button>
                    </div>
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