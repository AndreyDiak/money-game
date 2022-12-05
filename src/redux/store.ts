import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { gameReducer } from "./game/game-reducer";
import thunkMiddleWare from "redux-thunk";
import { profileReducer } from "./profile/profile-reducer";
import { settingsReducer } from "./settings-reducer";
import { worksReducer } from "./work-reducer";
import { stocksReducer } from "./market/stocks/stocks-reducer";
import { appReducer } from "./app-reducer";
import { spendsReducer } from "./spends-reducer";
import { realtyReducer } from "./market/realty/realty-reducer";
import { newsReducer } from "./news/news-reducer";
import { businessReducer } from "./market/business/business-reducer";

let rootReducer = combineReducers({
  gamePage: gameReducer,
  profilePage: profileReducer,
  settingsPage: settingsReducer,
  newsPage: newsReducer,
  worksPage: worksReducer,
  stocksPage: stocksReducer,
  businessPage: businessReducer,
  spendsPage: spendsReducer,
  realtyPage: realtyReducer,
  app: appReducer,
});

type RootReduceType = typeof rootReducer;
export type AppStateType = ReturnType<RootReduceType>;

type PropsType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropsType<T>>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);
// тестовый билд без разрешения
// const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleWare)))

// @ts-ignore
window.store = store;

export default store;
