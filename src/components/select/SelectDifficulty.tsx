import { Radio } from "antd";
import { useState } from "react";
import { defaultDiffilculty, difficultyAbout, optionsDifficulty } from "../../redux/settings/models";

import classes from './Select.module.css';

const SelectDifficulty = () => {

  const [difficulty, setDifficulty] = useState(defaultDiffilculty)

  return (
    <div className="profileSettings__Condition">
      <h4 className={classes.selectHeader}>Сложность</h4>
      <Radio.Group
        options={optionsDifficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
        optionType="button"
        className="settingsListItem__Radio"
      />
      <div className="profileSettings__ConditionAbout">
        {difficultyAbout['easy']}
      </div>
    </div>
  )
}

export default SelectDifficulty;