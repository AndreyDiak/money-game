import { Badge } from "antd";
import { useCallback } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { AppStateType } from "../../redux/store";

const HeaderNav = () => {

  const newsSelector = useCallback((state: AppStateType) => state.newsPage.news, [])
  const news = useSelector(newsSelector);

  return (
    <div className="navItem">
      <div className="navItem__link">
        <NavLink to='/game/spends'>
          Расходы
        </NavLink>
      </div>
      <div className="navItem__link">
        <NavLink to='/game/market'>
          Биржа
        </NavLink>
      </div>
      <div className="navItem__link">
        <NavLink to='/game/profile'>
          Профиль
        </NavLink>
      </div>

      <div className="navItem__link">
        <NavLink to='/game/bank' >
          Банк
        </NavLink>
      </div>
      <div className="navItem__link" >
        <Badge count={news.length} overflowCount={10}>
          <NavLink to='/game/news'>
            Новости
          </NavLink>
        </Badge>
      </div>
    </div>
  )
}

export default HeaderNav;