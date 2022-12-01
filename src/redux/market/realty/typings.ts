import { chances } from "./models";

export interface activeRealtyType {
  title: string;
  region: ChanceType;
  demand: ChanceType;
  deposit: number;
  price: number;
  income: number;
  paymentPercentage: number;
  photo: string;
  attempts: number;
  satisfaction: number;
  isBought: boolean;
}
export interface myRealtyType {
  title: string; // название недвижимости...
  region: ChanceType; // уровень региона...
  photo: string; // фото
  demand: ChanceType; // спрос на недвижимость
  price: number; // цена за которую был куплен дом...
  mortgage: number; // размер закладной...
  payment: number; // плата по закладной...
  income: number; // доход с жилья...
}
export type ChanceType = chances.HIGH | chances.MEDIUM | chances.LOW;