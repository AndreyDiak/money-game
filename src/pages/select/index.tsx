import { Avatar, Button } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import SelectDifficulty from "../../components/select/SelectDifficulty";
import { actions } from "../../redux/game/game-reducer";
import {
  profileActions,
  updateIncome
} from "../../redux/profile/profile-reducer";
import { settingsActions } from "../../redux/settings/settings-reducer";
import { getTimeSpeedSelector } from "../../redux/settings/settings-selector";
import { difficultiesType } from "../../redux/settings/typings";
import { spendsActions } from "../../redux/spends-reducer";
import { AppStateType } from "../../redux/store";

const SelectDifficulty = React.lazy(() => import('../../components/select/SelectDifficulty'))
const SelectTimeSpeed = React.lazy(() => import('../../components/select/SelectTimeSpeed'))
const SelectPage: FC = () => {
  const dispatch = useDispatch();
  const timeSpeed = useSelector(getTimeSpeedSelector);

  const persons = useSelector(
    (state: AppStateType) => state.profilePage.persons
  );
  const [activePerson, setActivePerson] = useState(0);

  const [filteredPersons, setFilteredPersons] = useState(
    persons.filter((f) => f.difficulty === "easy")
  );
  const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0);

  // выбор скорости игры
  const timesSpeed = [8, 4, 2];

  // расчёт подоходного налога / зависит на прямую от зп
  const tax =
    filteredPersons[activePerson].salary >= 500
      ? filteredPersons[activePerson].salary * 0.15 // на зп более 100$ повышенный налог...
      : filteredPersons[activePerson].salary * 0.1;

  let taxesSummary = filteredPersons[activePerson].expenses.reduce(
    (acc, next) => {
      return acc + (next.startPrice * next.payment) / 100;
    },
    tax
  );

  const setProfile = async () => {
    const profile = filteredPersons[activePerson];
    dispatch(profileActions.setProfile(profile));
    // устанавливаем подоходный налог на зп
    dispatch(profileActions.setTax(tax));
    // устанавливаем долги персонажа
    // dispatch(profileActions.setExpenses(persons[activePerson].expenses))
    // стартовый баланс
    dispatch(actions.setWallet(profile.saving));

    dispatch(updateIncome());
    // dispatch(actions.setIncome(persons[activePerson].salary - taxesSummary))
  };

  const onChangeTime = (e: any) => {
    dispatch(settingsActions.setTimeSpeed(e.target.value));
    dispatch(settingsActions.setConstTimeSpeed(e.target.value));
  };

  const onChangeDifficulty = (e: any) => {
    setDifficulty(e.target.value);
    let [filter, balance] =
      e.target.value === 0
        ? ["easy", 5000]
        : e.target.value === 1
          ? ["normal", 15000]
          : ["hard", 50000];
    dispatch(actions.setVictoryBalance(balance));
    dispatch(actions.setDifficulty(filter as difficultiesType));
    setActivePerson(0);
    setFilteredPersons(persons.filter((f) => f.difficulty === filter));
  };

  useEffect(() => {
    dispatch(spendsActions.setEventsPrice());
  }, [dispatch, persons]);

  return (
    <>
      <div className="profile bannerBack">
        <div className="profileBack">
          <NavLink to="/">
            <Button>Обратно в меню</Button>
          </NavLink>
        </div>

        <div className="profileMenu">
          <div className="profileMenuTitle">Выбор персонажа</div>
          <div className="profileMenuList">
            <div className="profileMenuList__items">
              {filteredPersons.length === 0 ? (
                "загрузка"
              ) : (
                <>
                  {filteredPersons.map((person, index) => {
                    return (
                      <span key={index}>
                        <div className="profileMenuList__item" key={index}>
                          <button
                            onClick={() => setActivePerson(index)}
                            className="profileMenuList__itemImg"
                          >
                            <Avatar
                              src={person.avatar}
                              size={100}
                              style={
                                activePerson === index
                                  ? { border: "2px solid crimson" }
                                  : {}
                              }
                            />
                          </button>
                        </div>
                      </span>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="profilePreview">
          <div className="profilePreview__Name">
            {filteredPersons[activePerson].name}
            <div className="profilePreview__NameWork">
              ({filteredPersons[activePerson].work})
            </div>
          </div>
          <div className="profilePreview__Img">
            <img src={filteredPersons[activePerson].img} alt="" />
          </div>
          <div className="profilePreview__Stats">
            <div className="profilePreview__StatsIncome">
              <div className="profilePreview__StatsTitle">Доходы</div>
              <div className="profilePreview__StatsBlock">
                <div className="profilePreview__StatsBlock__Title">
                  Зарплата:
                </div>
                <div className="profilePreview__StatsBlock__Price">
                  ${filteredPersons[activePerson].salary}
                </div>
              </div>
              <div className="profilePreview__StatsBlock">
                <div className="profilePreview__StatsBlock__Title">
                  Остаток:
                </div>
                <div className="profilePreview__StatsBlock__Price">
                  ${filteredPersons[activePerson].salary - taxesSummary}
                </div>
              </div>
            </div>
            <div className="profilePreview__StatsExpenses">
              <div className="profilePreview__StatsTitle">Расходы</div>
              <div className="profilePreview__StatsBlock">
                <div className="profilePreview__StatsBlock__Title">Налог:</div>
                <div className="profilePreview__StatsBlock__Price">${tax}</div>
              </div>
              {filteredPersons[activePerson].expenses.map((expense, index) => {
                return (
                  <>
                    {expense.remainPrice !== 0 ? (
                      <div className="profilePreview__StatsBlock" key={index}>
                        <div className="profilePreview__StatsBlock__Title">
                          {expense.title}:
                        </div>
                        <div className="profilePreview__StatsBlock__Price">
                          ${(expense.remainPrice * expense.payment) / 100}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
            <div className="profilePreview__StatsCash">
              <div className="profilePreview__StatsTitle">Наличные:</div>
              <div className="profilePreview__StatsBlock">
                ${filteredPersons[activePerson].saving}
              </div>
            </div>
          </div>
        </div>
        <div className="profileSettings">
          
          <SelectDifficulty />
          <SelectTimeSpeed />
          <div className="profileSettings__Button">
            <NavLink to="/game">
              <Button size="large" onClick={setProfile}>
                Начать игру
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPage;
