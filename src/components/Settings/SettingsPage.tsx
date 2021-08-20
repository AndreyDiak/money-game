import Radio from "antd/lib/radio";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../redux/settings-reducer";
import {getDifficultySelector, getTimeSpeedSelector} from "../../redux/settings-selector";
import {ReturnBackButton} from "../common/ReturnBackButton";

export const SettingsPage = () => {
  const dispatch = useDispatch()

  const timeSpeed = useSelector(getTimeSpeedSelector)
  const difficulty = useSelector(getDifficultySelector)
  // выбор скорости игры
  const timesSpeed = [8, 4, 2]

  const optionsTime = [
    { label: 'день/4сек', value: timesSpeed[0] },
    { label: 'день/2сек', value: timesSpeed[1] },
    { label: 'день/1сек', value: timesSpeed[2] },
  ];
  const optionsDifficulty = [
    { label: 'Легко', value: 'легко' },
    { label: 'Средне', value: 'средне' },
    { label: 'Сложно', value: 'сложно' },
  ];

  const onChangeTime = (e: any) => {
    dispatch(settingsActions.setTimeSpeed(e.target.value))
    dispatch(settingsActions.setConstTimeSpeed(e.target.value))
  };
  const onChangeDifficulty = (e: any) => {
    dispatch(settingsActions.setDifficulty(e.target.value))
  };

  return (
    <>
      <div className="settings bannerBack">
        <ReturnBackButton link='/'/>
        <div className="settingsList">
          <div className="settingsListItem">
            Скорость игры
            <br/>
            <Radio.Group
              options={optionsTime}
              onChange={onChangeTime}
              value={timeSpeed}
              optionType="button"
              className='settingsListItem__Radio'
            />
          </div>
          <div className="settingsListItem">
            Сложность игры
            <Radio.Group
              options={optionsDifficulty}
              onChange={onChangeDifficulty}
              value={difficulty}
              optionType="button"
              className='settingsListItem__Radio'
            />
          </div>
        </div>
      </div>
    </>
  )
}



