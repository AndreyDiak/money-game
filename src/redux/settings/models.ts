export enum difficulty {
  EASY = "easy",
  MEDIUM = "normal",
  HARD = "hard",
}

export enum timeSpeed {
  SLOW = 8,
  MEDIUM = 4,
  FAST = 2,
  STOP = 0,
}

export const difficultyAbout = {
  easy: "Быстрая игра, хорошо подходит для ознакомления с игрой, доступен только рынок акций, для победы добейтесь дохода в 5000$",
  normal:
    "Нормальная игры, подходит для тех кто изучил основные принципы игры и хочет попробовать что-то новенькое, доступен рынок акций и рынок недвижимости, для победы добейтесь дохода в 15000$",
  hard: "Долгая игра, пройдите суровую проверку своих навыков, все рынки доступны, для победы добейтесь дохода в 50000$",
};

// default diff value
export const defaultDiffilculty = difficulty.EASY;
// default timeSpeed value
export const defaultTimeSpeed = timeSpeed.MEDIUM;

export const optionsTime = [
  {
    label: "День / 4 сек",
    value: timeSpeed.SLOW,
  },
  {
    label: "День / 2 сек",
    value: timeSpeed.MEDIUM,
  },
  {
    label: "День / 1 сек",
    value: timeSpeed.FAST,
  },
];

export const optionsDifficulty = [
  {
    label: "Легкая",
    value: difficulty.EASY,
  },
  {
    label: "Нормальная",
    value: difficulty.MEDIUM,
  },
  {
    label: "Сложная",
    value: difficulty.HARD,
  },
];
