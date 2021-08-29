import img from './../../img/rofl.jpg'
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export const RoflPage = () => {
  return (
    <>
      <div><h6>Это ты)))</h6></div>
      <div>
        <img src={img} alt=""/>
      </div>
      <NavLink to='/'>
        <Button>
          выйти
        </Button>
      </NavLink>
    </>
  )
}