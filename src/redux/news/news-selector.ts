import { AppStateType } from "../store";

export const getNewsSelector = (state: AppStateType) => state.newsPage.news;

export const getArchiveSelector = (state: AppStateType) =>
  state.newsPage.archive;
