export const getRandomNumber = (k: number): number => {
  return Math.floor(Math.random() * k)
}

export const getRealtySatisfaction = (k: number): number => {
  return Number((0.6 + Math.random() * k).toFixed(2))
}