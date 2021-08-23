import Button from "antd/lib/button";
import {useDispatch, useSelector} from "react-redux";
import {getBusinessesSelector, getMyBusinessesSelector} from "../../redux/business-selector";
import {BusinessType, buyBusinessThunk, sellBusinessThunk} from "../../redux/business-reducer";
import {FC} from "react";
import {Tabs} from "antd";

const { TabPane } = Tabs

export const RenderPlayerBusiness = () => {

  const businesses = useSelector(getBusinessesSelector)
  const myBusinesses = useSelector(getMyBusinessesSelector)

  return (
    <>
      <div className="gameBusiness bannerBack">
        <Tabs defaultActiveKey="1" centered className='gameBusinessTabs'>
          <TabPane tab="Ваш бизнесс" key="1">
            <div className="gameBusinessBlocks">
              {myBusinesses.length === 0
                ? 'У вас нет своего бизнесса'
                : <>
                  {
                    myBusinesses.map((myBusiness, index) => <RenderBusinessBlock key={index} business={myBusiness} isMine={true}/>
                    )
                  }
                </>
              }
            </div>
          </TabPane>
          <TabPane tab="Купить бизнесс" key="2">
            <div className="gameBusinessBlocks">
              {businesses.map((business, index) => {
                const isBought = myBusinesses.some(b => b.name === business.name)
                const isMaxCount = myBusinesses.length >= 2
                return (
                  <>
                    <RenderBusinessBlock key={index} business={business} isBought={isBought} isMine={false} isMaxCount={isMaxCount}/>
                  </>
                )
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

const RenderBusinessBlock: FC<{business: BusinessType, isBought?: boolean, isMine: boolean, isMaxCount?: boolean}> = ({business, isBought, isMaxCount, isMine}) => {

  const dispatch = useDispatch()

  const priceToSell = Number((business.price * 0.6).toFixed(0))

  return (
    <>
      <div className={isBought ? 'gameBusinessBlock__Bought gameBusinessBlock' : 'gameBusinessBlock'}>
        <div className="gameBusinessBlock__Title">
          <b>{business.name}</b>
        </div>
        <div className="gameBusinessBlock__Img">
          <img src={business.img} alt=""/>
        </div>
        <div className="gameBusinessBlock__Stats">
          <div className="gameBusinessBlock__StatsMoney">

            <div className="gameBusinessBlock__StatsMoney__Price">
              {!isMine
              ? <span>Цена покупки: <b><i>{business.price}</i></b></span>
              : <span>Цена подажи: <b><i>{priceToSell}</i></b></span>
              }
            </div>

            <div className="gameBusinessBlock__StatsMoney__Income">
              Доход: <b><i>{business.income}</i></b>
            </div>
            <div>
              Окупаемость: <b style={{color: 'grey'}}><i>~{Math.ceil(business.price/business.income)} Месяцев</i></b>
            </div>
          </div>
           <div className="gameBusinessBlock__StatsButton">
            {
              !isMine
                ? <span>{!isBought && <Button disabled={isMaxCount} onClick={() => dispatch(buyBusinessThunk(business))}>Приобрести</Button>}</span>
                : <Button onClick={() => dispatch(sellBusinessThunk(business, priceToSell))}>Продать</Button>
            }
           </div>
        </div>
      </div>
    </>
  )
}