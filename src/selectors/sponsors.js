// @flow
import type { State } from "../reducers";
import type { Sponsor } from "../data/sponsor";

const getDataState = (state: State) => state.data;

/* eslint-disable import/prefer-default-export */
export const selectSponsors = (state: State): Sponsor[] =>
  ((getDataState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "sponsor"
  ): any[]): Sponsor[]);
