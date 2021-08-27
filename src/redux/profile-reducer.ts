import {InferActionsType} from "./store";
import person1Photo from "../img/characters/person-1.png";
import person1Avatar from "../img/characters/person-1-avatar.png";
import person2Photo from "../img/characters/person-2.png";
import person2Avatar from "../img/characters/person-2-avatar.png";
import person3Photo from "../img/characters/person-3.png";
import person3Avatar from "../img/characters/person-3-avatar.png";
import person4Photo from "../img/characters/person-4.png";
import person4Avatar from "../img/characters/person-4-avatar.png";
import {WorksType} from "./work-reducer";

const SET_PROFILE = 'profilePage/SET_PROFILE'

let initialState = {
  // список возможных персонажей . . .
  persons: [
    {
      name: 'Тестовый персонаж',
      age: 28,
      img: person1Photo,
      preferences: [
        {type: 'it' as WorksType, rise: 10},
        {type: 'manager' as WorksType, rise: 10},
        {type: 'engineer' as WorksType, rise: 10},
      ],
      saving: 30000,
      avatar: person1Avatar
    }, {
      name: 'Max',
      age: 24,
      img: person2Photo,
      preferences: [
        {type: 'it' as WorksType, rise: 0},
        {type: 'manager' as WorksType, rise: 8},
        {type: 'engineer' as WorksType, rise: 2},
      ],
      saving: 370,
      avatar: person2Avatar
    } as personType, {
      name: 'Bill',
      age: 19,
      img: person3Photo,
      preferences: [
        {type: 'it' as WorksType, rise: 8},
        {type: 'manager' as WorksType, rise: 0},
        {type: 'engineer' as WorksType, rise: 0},
      ],
      saving: 280,
      avatar: person3Avatar
    } as personType, {
      name: 'Kate',
      age: 23,
      img: person4Photo,
      preferences: [
        {type: 'it' as WorksType, rise: 2},
        {type: 'manager' as WorksType, rise: 7},
        {type: 'engineer' as WorksType, rise: 4},
      ],
      saving: 1000,
      avatar: person4Avatar
    } as personType,
  ],
  // наш профиль . . .
  profile: null as null | personType
}

export type InitialProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileActionsType): InitialProfileStateType => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return {
        ...state
      }
  }
}

export const profileActions = {
  setProfile: (profile: personType) => ({type: SET_PROFILE, profile} as const)
}

type ProfileActionsType = InferActionsType<typeof profileActions>
export type personType = {
  name: string
  age: number
  preferences: {
    type: WorksType
    rise: number
  }[]
  saving: number
  img: string
  avatar: string
}
