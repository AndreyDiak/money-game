import Radio from "antd/lib/radio";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../redux/settings-reducer";
import {getDifficultySelector, getTimeSpeedSelector} from "../../redux/settings-selector";
import {ReturnBackButton} from "../common/ReturnBackButton";

export const SettingsPage = () => {


  return (
    <>
      <div className="settings bannerBack">
        <ReturnBackButton link='/'/>

      </div>
    </>
  )
}



