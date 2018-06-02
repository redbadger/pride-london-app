// @flow
import type { State } from "../reducers";
import type { HeaderBanner } from "../data/header-banner";

/* eslint-disable import/prefer-default-export */
export const selectHeaderBanners = (state: State): HeaderBanner[] =>
  ((state.data.entries.filter(
    entry => entry.sys.contentType.sys.id === "headerBanner"
  ): any[]): HeaderBanner[]);
