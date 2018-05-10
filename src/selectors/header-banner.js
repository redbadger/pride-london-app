// @flow
import type { State } from "../reducers";
import type { HeaderBanner } from "../data/header-banner";

const getEventsState = (state: State) => state.events;

/* eslint-disable import/prefer-default-export */
export const selectHeaderBanners = (state: State): HeaderBanner[] =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "headerBanner"
  ): any[]): HeaderBanner[]);
