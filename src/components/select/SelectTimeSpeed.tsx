import { Radio } from "antd";
import { useState } from "react";
import { defaultTimeSpeed, optionsTime } from "../../redux/settings/models";

import classes from './Select.module.css';

const SelectDifficulty = () => {

  const [timeSpeed, setTimeSpeed] = useState(defaultTimeSpeed)

  return (
    <div className="profileSettings__Speed">
      <h4 className={classes.selectHeader}>Скорость игры</h4>
      <Radio.Group
        options={optionsTime}
        onChange={(e) => setTimeSpeed(e.target.value)}
        value={timeSpeed}
        optionType="button"
        className="profileSettings__SpeedRadio"
      />
    </div>
  )
}

export default SelectDifficulty;