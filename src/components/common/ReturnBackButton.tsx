import {LeftSquareOutlined} from "@ant-design/icons/lib/icons";
import { FC } from "react";
import {NavLink} from "react-router-dom";

export const ReturnBackButton:FC<{link: string}> = (props) => {
  return (
    <div className="returnBack">
      <NavLink to={props.link}>
        <button className='returnBackButton buttonNav'>
          <LeftSquareOutlined />
        </button>
      </NavLink>
    </div>
  )
}
