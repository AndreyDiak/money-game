import {applyMiddleware, combineReducers, createStore} from "redux";
import {gameReducer} from "./game-reducer";
import thunkMiddleWare from "redux-thunk"
import {profileReducer} from "./profile-reducer";
import {settingsReducer} from "./settings-reducer";
import {newsReducer} from "./news-reducer";
import {worksReducer} from "./work-reducer";
import {stocksReducer} from "./stocks-reducer";


let rootReducer = combineReducers({
  gamePage: gameReducer,
  profilePage: profileReducer,
  settingsPage: settingsReducer,
  newsPage: newsReducer,
  worksPage: worksReducer,
  stocksPage: stocksReducer
})

type RootReduceType = typeof rootReducer
export type AppStateType = ReturnType<RootReduceType>

type PropsType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropsType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store