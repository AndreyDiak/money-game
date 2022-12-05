import { ThunkAction } from "redux-thunk";
import { characters } from "../../img";
import { actions } from "../game/game-reducer";
import { AppStateType, InferActionsType } from "../store";

const SET_PROFILE = "profilePage/SET_PROFILE";
const SET_TAX = "profilePage/SET_TAX";
// const SET_EXPENSES = 'profilePage/SET_EXPENSES'
const UPDATE_EXPENSES = "profilePage/UPDATE_EXPENSES";
const PAY_FOR_EXPENSES = "profilePage/PAY_FOR_EXPENSES";
const SET_CREDIT = "profilePage/SET_CREDIT";
const UPDATE_INCOME = "profilePage/UPDATE_INCOME";
const SET_SALARY = "profilePage/SET_SALARY";
const NEW_CHILD = "profilePage/NEW_CHILD";
const SET_NEW_PROFILE = "profilePage/SET_NEW_PROFILE";

let initialState = {
  // список возможных персонажей . . .
  // виды расходов
  // дом / машина / кредитная карта / кредит
  // для каждого расходов есть своя фикс. сумма и % который надо выплачивать каждый месяц
  persons: [
    {
      name: "Эдди",
      age: 28,
      saving: 1100,
      salary: 700,
      work: "Маркетолог",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 4000,
          startPrice: 4000,
          payment: 2,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 1500,
          startPrice: 1500,
          payment: 5,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 800,
          startPrice: 800,
          payment: 3,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 1200,
          startPrice: 1200,
          payment: 5,
        },
      ],
      difficulty: "easy",
      img: characters.EDDIE.photo,
      avatar: characters.EDDIE.avatar,
    },
    {
      name: "Макс",
      age: 24,
      saving: 1000,
      salary: 750,
      work: "Менеджер",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 3000,
          startPrice: 3000,
          payment: 4,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 1700,
          startPrice: 1700,
          payment: 4,
        },
      ],
      difficulty: "easy",
      img: characters.MAX.photo,
      avatar: characters.MAX.avatar,
    },
    {
      name: "Билл",
      age: 19,
      saving: 830,
      salary: 520,
      work: "Разработчик",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 2,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
      ],
      difficulty: "normal",
      img: characters.BILL.photo,
      avatar: characters.BILL.avatar,
    },
    {
      name: "Кейт",
      age: 23,
      saving: 720,
      salary: 530,
      work: "Переводчик",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1400,
          startPrice: 1400,
          payment: 3,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 2000,
          startPrice: 2000,
          payment: 4,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 600,
          startPrice: 600,
          payment: 6,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "normal",
      img: characters.KATE.photo,
      avatar: characters.KATE.avatar,
    },
    {
      name: "Фред",
      age: 21,
      saving: 530,
      salary: 370,
      work: "Официант",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1300,
          startPrice: 1300,
          payment: 4,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
      ],
      difficulty: "hard",
      img: characters.FRED.photo,
      avatar: characters.FRED.avatar,
    },
    {
      name: "Джимми",
      age: 25,
      saving: 925,
      salary: 930,
      work: "Режиссёр",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 2500,
          startPrice: 2500,
          payment: 6,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 800,
          startPrice: 800,
          payment: 5,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1700,
          startPrice: 1700,
          payment: 4,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "easy",
      img: characters.JIMM.photo,
      avatar: characters.JIMM.avatar,
    },
    {
      name: "Брэд",
      age: 31,
      saving: 890,
      salary: 670,
      work: "Страховщик",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1200,
          startPrice: 1200,
          payment: 4,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 4,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 2000,
          startPrice: 2000,
          payment: 3,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "easy",
      img: characters.BRAD.photo,
      avatar: characters.BRAD.avatar,
    },
    {
      name: "Лизи",
      age: 26,
      saving: 710,
      salary: 550,
      work: "Бухгалтер",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 6,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 1200,
          startPrice: 1200,
          payment: 4,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 900,
          startPrice: 900,
          payment: 5,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "normal",
      img: characters.LIZI.photo,
      avatar: characters.LIZI.avatar,
    },
    {
      name: "Изабель",
      age: 18,
      saving: 1200,
      salary: 650,
      work: "Танцовщица",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1400,
          startPrice: 1400,
          payment: 3,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1500,
          startPrice: 1500,
          payment: 4,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
      ],
      difficulty: "easy",
      img: characters.IZABEL.photo,
      avatar: characters.IZABEL.avatar,
    },
    {
      name: "Фрэнк",
      age: 29,
      saving: 55000,
      salary: 600,
      work: "Продюсер",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1200,
          startPrice: 1200,
          payment: 7,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 8,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 850,
          startPrice: 850,
          payment: 6,
        },
      ],
      difficulty: "normal",
      img: characters.FRANK.photo,
      avatar: characters.FRANK.avatar,
    },
    {
      name: "Алекс",
      age: 28,
      saving: 510,
      salary: 360,
      work: "Журналист",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1200,
          startPrice: 1200,
          payment: 5,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1050,
          startPrice: 550,
          payment: 3,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "hard",
      img: characters.ALEX.photo,
      avatar: characters.ALEX.avatar,
    },
    {
      name: "Адам",
      age: 28,
      saving: 740,
      salary: 580,
      work: "Имиджмейкер",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 12,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 800,
          startPrice: 800,
          payment: 8,
        },
      ],
      difficulty: "normal",
      img: characters.ADAM.photo,
      avatar: characters.ADAM.avatar,
    },
    {
      name: "Хейли",
      age: 27,
      saving: 560,
      salary: 330,
      work: "Учитель",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1500,
          startPrice: 1500,
          payment: 2,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "hard",
      img: characters.HAILEY.photo,
      avatar: characters.HAILEY.avatar,
    },
    {
      name: "Лили",
      age: 26,
      saving: 540,
      salary: 370,
      work: "Врач",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 700,
          startPrice: 700,
          payment: 4,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 3,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 600,
          startPrice: 600,
          payment: 5,
        },
      ],
      difficulty: "hard",
      img: characters.LILI.photo,
      avatar: characters.LILI.avatar,
    },
    {
      name: "Боб",
      age: 23,
      saving: 640,
      salary: 890,
      work: "Инженер",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 1500,
          startPrice: 1500,
          payment: 7,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 1000,
          startPrice: 1000,
          payment: 4,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 200,
          startPrice: 200,
          payment: 7,
        },
      ],
      difficulty: "easy",
      img: characters.BOB.photo,
      avatar: characters.BOB.avatar,
    },
    {
      name: "Эльза",
      age: 21,
      saving: 600,
      salary: 550,
      work: "Эскортинца",
      expenses: [
        {
          type: "home",
          title: "Дом",
          remainPrice: 2400,
          startPrice: 2400,
          payment: 6,
        },
        {
          type: "car",
          title: "Машина",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "card",
          title: "Кред. карта",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
        {
          type: "credit",
          title: "Кредит",
          remainPrice: 0,
          startPrice: 0,
          payment: 0,
        },
      ],
      difficulty: "normal",
      img: characters.ELZA.photo,
      avatar: characters.ELZA.avatar,
    },
  ] as personType[],
  // наш профиль . . .
  profile: null as null | personType, // профиль персонажа
  startSalary: 0, // начальная зп
  tax: 0, // налог с зп
  income: 0, // доход персонажа
  childrenCount: 0, // количество детей...
};

export type InitialProfileStateType = typeof initialState;

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): InitialProfileStateType => {
  switch (action.type) {
    // установка профиля игрока
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
        startSalary: action.profile.salary,
      };
    // подоходный налог
    case SET_TAX:
      return {
        ...state,
        tax: action.tax,
      };
    // ежемесячные выплаты по долгам
    case UPDATE_EXPENSES:
      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: state.profile?.expenses.map((expense, index) => {
            return {
              ...expense,
              // если долг > 0 то мы выплачиваем его
              remainPrice:
                expense.remainPrice > 0
                  ? // если ежемесячная плата больше чем оставшийся долг, то мы выплачиваем тока нужную часть
                    expense.remainPrice <
                    (expense.startPrice * expense.payment) / 100
                    ? expense.remainPrice === 0
                    : expense.remainPrice -
                      (expense.startPrice * expense.payment) / 100
                  : 0,
            };
          }),
        } as personType,
      };
    // пользователь выплачивает свой кредит
    case PAY_FOR_EXPENSES:
      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: action.expenses,
        } as personType,
      };
    // добавляем кредитные данные в профиль персонажа
    case SET_CREDIT:
      return {
        ...state,
        profile: {
          ...state.profile,
          expenses: state.profile?.expenses.map((expense) => {
            if (expense.type === "credit") {
              return action.expenses[3];
            }
            return expense;
          }),
        } as personType,
      };
    // обновляем доход персонажа
    case UPDATE_INCOME:
      // здесь мы будем собирать все возможные пассивные доходы персонажа и суммировать
      return {
        ...state,
        // @ts-ignore
        income: action.newIncome,
      };
    // обновляем зарплату персонажа
    case SET_SALARY:
      return {
        ...state,
        profile: {
          ...state.profile,
          salary: action.newSalary,
        } as personType,
      };

    case NEW_CHILD:
      return {
        ...state,
        childrenCount: state.childrenCount + 1,
      };

    case SET_NEW_PROFILE:
      return {
        ...state,
        profile: action.profile,
        startSalary: action.startSalary,
        income: action.income,
        childrenCount: action.childrenCount,
        tax: action.tax,
      };
    default:
      return {
        ...state,
      };
  }
};

export const profileActions = {
  setProfile: (profile: personType) =>
    ({ type: SET_PROFILE, profile } as const),
  setTax: (tax: number) => ({ type: SET_TAX, tax } as const),
  updateExpenses: () => ({ type: UPDATE_EXPENSES } as const),
  payForExpenses: (expenses: expenseType[]) =>
    ({ type: PAY_FOR_EXPENSES, expenses } as const),
  setCredit: (expenses: expenseType[]) =>
    ({ type: SET_CREDIT, expenses } as const),
  updateIncome: (newIncome: number) =>
    ({ type: UPDATE_INCOME, newIncome } as const),
  setSalary: (newSalary: number) => ({ type: SET_SALARY, newSalary } as const),
  newChild: () => ({ type: NEW_CHILD } as const),
  setNewProfile: (
    startSalary: number,
    income: number,
    children: number[],
    childrenCount: number,
    profile: personType,
    tax: number
  ) =>
    ({
      type: SET_NEW_PROFILE,
      startSalary,
      income,
      childrenCount,
      children,
      profile,
      tax,
    } as const),
};

export const payForExpensesThunk =
  (price: number, expenseType: string): ProfileThunkType =>
  (dispatch, getState) => {
    // price / сумма к погашению долга
    // expenseType / долг, который гасит пользователь

    // @ts-ignore
    let expensesCopy = [...getState().profilePage.profile?.expenses] as expenseType[];
    // находим нужный нам долг и режим его на сумму выплаты банку
    expensesCopy.forEach((expense, index) => {
      if (expense.type === expenseType) {
        expensesCopy[index].remainPrice = expense.remainPrice - price;
      }
    });
    dispatch(profileActions.payForExpenses(expensesCopy));
    // @ts-ignore / уменошаем баланс пользователя
    dispatch(actions.updateWalletFromSpends(price));

    dispatch(updateIncome());
  };
export const takeCreditThunk =
  (
    creditAmount: number,
    payoutPercentage: number,
    finalPayout: number
  ): ProfileThunkType =>
  (dispatch, getState) => {
    // creditAmount / размер кредита
    // payoutPercentage / месячный процент
    // finalPayout / размер возврата
    // @ts-ignore
    let expensesCopy = [...getState().profilePage.profile?.expenses] as expenseType[];
    expensesCopy[3] = {
      ...expensesCopy[3],
      remainPrice: finalPayout,
      startPrice: finalPayout,
      payment: payoutPercentage,
    };
    // добавляем выплаты по кредиту в профиль игрока...
    dispatch(profileActions.setCredit(expensesCopy));
    // @ts-ignore начисляем сумму кредита на счет игрока...
    dispatch(actions.updateWalletFromSpends(-creditAmount));
    // обновляем доход персонажа... (теперь он платит процент по кредиту...)
    dispatch(updateIncome());
  };
export const updateIncome = (): ProfileThunkType => (dispatch, getState) => {
  // Изменить суммарные подсчеты начислений на баланс игрока...
  console.log('updateIncome')
  const profilePage = getState().profilePage;
  const profile = profilePage.profile as personType;
  console.log(profile);
  const tax = profilePage.tax;
  const salary = profile.salary;
  const myStocks = getState().stocksPage.myStocks;
  const myRealty = getState().realtyPage.myRealty;
  const myBusiness = getState().businessPage.myBusinesses;
  // начисление с аекций
  let dividendsSummary = myStocks.reduce(
    (acc, next) => acc + next.dividendsAmount * next.count,
    0
  );
  // начисления с недвижимости
  let realtySummary = myRealty.reduce(
    (acc, next) => acc + next.income - next.payment,
    0
  );
  // начисления с бизнесса
  let businessSummary = myBusiness.reduce((acc, next) => acc + next.income, 0);
  // долги игрока...
  let expensesSummary = profile.expenses.reduce(
    (acc, next) =>
      next.remainPrice > 0 ? acc + (next.startPrice * next.payment) / 100 : acc,
    0
  );
  // плата за детей...
  let childrenSummary = profilePage.childrenCount * 125;
  // считаем новый доход персонажа...
  let NewIncome = Math.round(
    salary -
      tax -
      expensesSummary -
      childrenSummary +
      dividendsSummary +
      realtySummary +
      businessSummary
  );
  console.log('NewIncome: ' + NewIncome);
  // новый доход игрока...
  dispatch(profileActions.updateIncome(NewIncome));
};
export type ProfileActionsType = InferActionsType<typeof profileActions>;

export type expenseType = {
  type: string;
  title: string;
  remainPrice: number;
  startPrice: number;
  payment: number;
};
export type personType = {
  name: string;
  age: number;
  saving: number;
  salary: number;
  img: string;
  avatar: string;
  work: string;
  difficulty: "easy" | "normal" | "hard";
  expenses: expenseType[];
};
type ProfileThunkType = ThunkAction<
  any,
  AppStateType,
  unknown,
  ProfileActionsType
>;
