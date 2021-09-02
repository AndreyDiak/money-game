import {useDispatch, useSelector} from "react-redux";
import {getPersonSelector} from "../../redux/profile-selector";
import {payForExpensesThunk, personType, profileActions, takeCreditThunk} from "../../redux/profile-reducer";
import {Button, Input, InputNumber, Select} from "antd";
import {useEffect, useState} from "react";
import {AppStateType} from "../../redux/store";

const { Option } = Select

export const RenderPlayerBank = () => {

  const dispatch = useDispatch()
  const profile = useSelector(getPersonSelector) as personType

  function onChange(value: any) {
    console.log('changed', value);
    setCreditAmount(() => Number(value.target.value))
  }

  function handleChange(value: any) {
    console.log(`selected ${value}`);
    setActiveExpense(value)
  }

  const [creditPercentage, setCreditPercentage] = useState(15) // процентная ставка по кредиту
  const [payoutPercentage, setPayoutPercentage] = useState(10) // процентная ставка на месячный платеж

  const [creditAmount, setCreditAmount] = useState(1000) // размер займа

  const [finalPayout, setFinalPayout] = useState(Math.round(creditAmount + creditAmount * creditPercentage / 100)) // размер суммы к выплате
  const [monthPayout, setMonthPayout] = useState(creditAmount / payoutPercentage) // размер месячной выплата

  const [activeExpense, setActiveExpense] = useState(0) // активный долг для погашения
  const [expenseAmount, setExpenseAmount] = useState(profile.expenses[activeExpense].remainPrice) // сумма для погашения долга

  useEffect(() => {
    setFinalPayout(Math.round(creditAmount + creditAmount * creditPercentage / 100))
    setMonthPayout(creditAmount / payoutPercentage)
  },[creditAmount])

  const payForExpenses = () => {
    dispatch(payForExpensesThunk(expenseAmount, profile.expenses[activeExpense].type))
  }

  const takeCredit = () => {
    dispatch(takeCreditThunk(creditAmount, payoutPercentage, finalPayout))
  }

  // const initialExpenses = useSelector((state: AppStateType) => state.profilePage.initialExpenses)

  console.table(profile.expenses)

  return (
    <>
      <div className="gameBank bannerBack">
        <div className="gameBankContent">
          <div className="gameBankContent__liabilities">
            <div className="gameBankContent__Title">
              Долги
            </div>
            <div className="gameBankContent__Blocks">
              {profile.expenses.map((expense, index) => {
                return (
                  <>
                    {expense.remainPrice !== 0
                     ? <div className='gameBankContent__Block'>
                        <div className="gameBankContent__BlockTitle">{expense.title}</div>
                        <div className="gameBankContent__BlockPrice"><b>{expense.remainPrice}</b></div>
                      </div>
                      : ''
                    }
                  </>
                )
              })}
            </div>
          </div>
          <div className="gameBankContent__credit">
            <div className="gameBankContent__Title">
              Взять кредит
            </div>
            {profile.expenses[3].remainPrice === 0
              ? <>
                <div className="gameBankContent__Form">
                  <small>
                    <i>(нельзя брать кредит размером более <b>10</b> окладов)</i>
                  </small>
                  <div className="gameBankContent__FormInput">
                    <Input size="large" prefix='$' value={creditAmount} onChange={onChange} />
                  </div>
                  <div className='gameBankContent__FormPayloads'>
                    <div className='gameBankContent__FormPayload'>
                      Нужно выплатить: <b>{finalPayout}</b>
                    </div>
                    <div className='gameBankContent__FormPayload'>
                      Ежемесячный платёж: <b>{monthPayout}</b>
                    </div>
                  </div>
                  <br/>
                </div>
                <div className="gameBankContent__Button">
                  <Button size={'large'} onClick={() => takeCredit()}>
                    Взять кредит
                  </Button>
                </div>
                </>
              : <div className="warning">
                  Нужно погасить кредит, прежде чем брать новый!
                </div>
            }
          </div>
          <div className="gameBankContent__payout">
            <div className="gameBankContent__Title">
              Выплатить долг
            </div>
            <div className="gameBankContent__Menu">
              <div className="gameBankContent__MenuSelect">
                <Select defaultValue={profile.expenses[activeExpense].title} onChange={handleChange}>
                  {profile.expenses.map((expense, index) => {
                    return (
                      <>
                        {expense.remainPrice !== 0
                          ? <Option value={index}>
                              {expense.title}
                            </Option>
                          : ''
                        }
                      </>
                    )
                  })}
                </Select>
              </div>
              <div className="gameBankContent__MenuPay">
                <div className="gameBankContent__MenuPay__Price">
                  К оплате: <b>{profile.expenses[activeExpense].remainPrice}</b>
                </div>
                <div className="gameBankContent__MenuPay__Input">
                  <Input value={expenseAmount} prefix='$' max={profile.expenses[activeExpense].remainPrice} min={1} onChange={(e) => setExpenseAmount(Number(e.target.value))}/>
                </div>
              </div>
            </div>
            {/* TODO нельзя ставить больше, чем надо */}
            <div className="gameBankContent__Button">
              <Button size={'large'} onClick={() => payForExpenses()} disabled={expenseAmount > profile.expenses[activeExpense].remainPrice || expenseAmount < 1}>
                Оплатить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}