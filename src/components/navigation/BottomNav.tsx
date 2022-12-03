import { Badge } from "antd"
import { useCallback } from "react"
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { menuIcons } from "../../img"
import { AppStateType } from "../../redux/store"


const BottomNav = () => {

  const newsSelector = useCallback((state: AppStateType) => state.newsPage.news, [])
  const news = useSelector(newsSelector);

  return (
    <div className="bottomNav">
      <div className="bottomNavItem">
        <NavLink to='/game/spends'>
          <button className="">
            <img src={menuIcons.SPENDS} alt="" />
          </button>
        </NavLink>
      </div>
      <div className="bottomNavItem">
        <NavLink to='/game/market'>
          <button className="">
            <img src={menuIcons.MARKET} alt="" />
          </button>
        </NavLink>
      </div>
      <div className="bottomNavItem">
        <NavLink to='/game/profile'>
          <button className="">
            <img src={menuIcons.PROFILE} alt="" />
          </button>
        </NavLink>
      </div>
      <div className="bottomNavItem">
        <NavLink to='/game/bank'>
          <button className="">
            <img src={menuIcons.BANK} alt="" />
          </button>
        </NavLink>
      </div>
      <div className="bottomNavItem">
        <Badge count={news.length} size={"small"} overflowCount={10}>
          <NavLink to='/game/news'>
            <button className="">
              <img src={menuIcons.NEWS} alt="" />
            </button>
          </NavLink>
        </Badge>
      </div>
    </div>
  )
}

export default BottomNav;
